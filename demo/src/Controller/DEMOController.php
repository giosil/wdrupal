<?php

namespace Drupal\demo\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DEMOController {
  
  public function content() {
    $data = '';
    $user = \Drupal::currentUser();
    if($user->isAuthenticated()) {
      $name = $user->getAccountName();
      if(!is_null($name)) {
        $data = ' data-user="' . $name . '"';
      }
    }
    return array(
      '#markup' => '<div id="view-root"' . $data . '></div>'
    );
  }
  
  public function consent(Request $request, string $value) {
    $data = [];
    
    $user = \Drupal::currentUser();
    if(!$user->isAuthenticated()) {
      $this->_log_info('consent (not authenticated)');
      return new JsonResponse($data);
    }
    
    $name = $user->getAccountName();
    if(is_null($name)) {
      $this->_log_info('consent (username is null)');
      return new JsonResponse($data);
    }
    
    $this->_log_info('consent ' . $name . ' ' . $value);
    
    $this->createConsentsTable();
    
    $db = \Drupal::database();
    
    if(is_numeric($value)) {
      $iv = intval($value);
      
      if($iv < 0) {
        $resDel = $db->delete('app_consents')
          ->condition('username', $name, '=')
          ->execute();
        // Check result
        if ($resDel) {
          $this->_log_info('consent ' . $name . ' ' . $value . ' (deleted)');
        }
        else {
          $this->_log_warn('consent ' . $name . ' ' . $value . ' (NOT deleted)');
        }
        return new JsonResponse($data);
      }
      
      // Check record by username 
      $count = $db->select('app_consents')->condition('username', $name, '=')
        ->countQuery()
        ->execute()
        ->fetchField();
      
      $this->_log_info('consent ' . $name . ' ' . $value . ' (count = ' . $count . ')');
      
      if($count > 0) {
        // Update
        $resUpd = $db->update('app_consents')
          ->fields(['consent' => $iv, 'updtime' => time()])
          ->condition('username', $name, '=')
          ->execute();
        
        // Check result
        if ($resUpd) {
          $this->_log_info('consent ' . $name . ' ' . $value . ' (updated)');
        }
        else {
          $this->_log_warn('consent ' . $name . ' ' . $value . ' (NOT updated)');
        }
      }
      else {
        // Insert
        $resIns = $db->insert('app_consents')
          ->fields(["username" => $name, "consent" => $iv, "instime" => time(), "updtime" => time()])
          ->execute();
        
        // Check result
        if ($resIns) {
          $this->_log_info('consent ' . $name . ' ' . $value . ' (inserted)');
        }
        else {
          $this->_log_warn('consent ' . $name . ' ' . $value . ' (NOT inserted)');
        }
      }
    }
    
    // Read
    $sql = "SELECT username,consent,instime,updtime FROM app_consents WHERE username='" . str_replace("'", "''" , $name) . "'";
    $res = $db->query($sql)->fetchAll();
    foreach ($res as $r) {
      $data[] = [
        'username' => $r->username, 'consent' => $r->consent, 'instime' => $r->instime, 'updtime' => $r->updtime
      ];
    }
    
    return new JsonResponse($data);
  }
  
  public function createConsentsTable() {
    $db = \Drupal::database();
    if (!$db->schema()->tableExists('app_consents')) {
      // Create table
      $schema = [
        'fields' => [
          'username' => ['type' => 'varchar',   'length'   => 255,  'not null' => TRUE],
          'consent'  => ['type' => 'int',       'length'   => 1,    'default'  => 0],
          'instime'  => ['type' => 'timestamp', 'not null' => TRUE],
          'updtime'  => ['type' => 'timestamp', 'not null' => TRUE]
        ],
        'primary key' => ['username']
      ];
      $db->schema()->createTable('app_consents', $schema);
      // Insert default record
      $db->insert('app_consents')
        ->fields(["username" => "default", "consent" => 1, "instime" => time(), "updtime" => time()])
        ->execute();
    }
  }
  
  public function upload(Request $request) {
    $response = new Response();
    $response->headers->set('Content-Type', 'application/json');
    $json = '{';

    try {
      $uplFile = $request->files->get('datafile');
      $subFolder = $request->request->get('subfolder');;

      if(is_null($uplFile)) {
        $json = $json . '"message": "datafile absent"';
      }
      else {
        // Destination directory
        $destDir = '/data01';
        if(!empty($subFolder)) {
          $destDir = $destDir . '/' . $subFolder;
        }
        if(!file_exists($destDir)) {
          mkdir($destDir);
        }

        // Server data
        $json .= '"destDir": "' . $destDir . '",';

        // Uploaded file
        $json .= '"originalName": "' . $uplFile->getClientOriginalName() . '",';
        $json .= '"originalExtension": "' . $uplFile->getClientOriginalExtension() . '",';
        $json .= '"mimeType": "' . $uplFile->getClientMimeType() . '",';
        $json .= '"error": ' . $uplFile->getError() . ',';
        $json .= '"valid": ' . $uplFile->isValid() . ',';
        $json .= '"clientSize": ' . $uplFile->getClientSize() . ',';
        $json .= '"maxFilesize": ' . $uplFile->getMaxFilesize() . ',';

        // Move file in destination directory
        $destFile = $uplFile->move($destDir, date('Ymd_His') . '_' . $uplFile->getClientOriginalName());

        // Destination file
        $json .= '"filename": "' . $destFile->getFilename() . '",';
        $json .= '"path": "' . $destFile->getPath() . '",';
        $json .= '"pathname": "' . $destFile->getPathname() . '",';
        $json .= '"realPath": "' . $destFile->getRealPath() . '",';
        $json .= '"size": ' . $destFile->getSize();
      }
    }
    catch(Exception $e) {
      $json = $json . '"message": "' . $e->getMessage() . '"';
    }
    $json = $json . '}';

    $response->setContent($json);

    return $response;
  }

  public function files0(string $fileName, Request $request) {
    $filePath = '/data01' . '/' . $fileName;
    if(!file_exists($filePath)) {
      return new Response('', 404);
    }
    $mime = mime_content_type($filePath);
    if($mime === false) {
      return new Response('', 404);
    }
    $response = new Response();
    $response->headers->set('Content-Type', $mime);
    $response->setContent(file_get_contents($filePath));
    return $response;
  }

  public function files1(string $subfolder, string $fileName, Request $request) {
    $filePath = '/data01' . '/' . $subfolder . '/' . $fileName;
    if(!file_exists($filePath)) {
      return new Response('', 404);
    }
    $mime = mime_content_type($filePath);
    if($mime === false) {
      return new Response('', 404);
    }
    $response = new Response();
    $response->headers->set('Content-Type', $mime);
    $response->setContent(file_get_contents($filePath));
    return $response;
  }

  public function list_files(Request $request) {
    $destDir = '/data01';
    $data_files = scandir($destDir);
    $list_files = '';
    if(!empty($data_files)) {
      $list_files = implode(",", $data_files);
    }

    $response = new Response();
    $response->headers->set('Content-Type', 'application/json');
    $json = '{"dir": "' . $destDir . '","files":[' . $list_files . ']}';
    $response->setContent($json);

    return $response;
  }

  public function api_get_temi(Request $request) {
    if(static::cfgMock()) {
      return $this->_mock($request, static::cfgMockUrl() . "get-temi");
    }
    else {
      return $this->_send($request, static::cfgBaseUrl() . "get-temi");
    }
  }

  private function _send(Request &$request, $url) {

    $requri = $request->getRequestUri();
    $method = $request->getMethod();
    $params = "";
    $pospar = strpos($requri, "?");
    if($pospar !== false) $params = substr($requri, $pospar);
    if(empty($method)) $method = "GET";

    if(strcmp($method, "GET") == 0) {
      $cnt = file_get_contents($url . $params);
      $cty = $this->getHeader($http_response_header, 'Content-Type');
      $cds = $this->getHeader($http_response_header, 'Content-Disposition');
      if(empty($cty)) {
        $cty = $this->getContentType($cnt, 'application/json');
      }

      $response = new Response();
      $response->setContent($cnt);
      $response->headers->set('Content-Type', $cty);
      if(!empty($cds)) {
        $response->headers->set('Content-Disposition', $cds);
      }

      return $response;
    }
    else {
      $opts = array('http' =>
      array(
            'method'  => $method,
            'header'  => 'Content-Type: application/json',
            'content' => $request->getContent()
        )
      );

      $context  = stream_context_create($opts);

      $cnt = file_get_contents($url . $params, false, $context);
      $cty = $this->getHeader($http_response_header, 'Content-Type');
      $cds = $this->getHeader($http_response_header, 'Content-Disposition');
      if(empty($cty)) {
        $cty = $this->getContentType($cnt, 'application/json');
      }

      $response = new Response();
      $response->setContent($cnt);
      $response->headers->set('Content-Type', $cty);
      if(!empty($cds)) {
        $response->headers->set('Content-Disposition', $cds);
      }

      return $response;
    }
  }

  private function _get(Request &$request, $url, $fileName) {
    $requri = $request->getRequestUri();

    $params = "";
    $pospar = strpos($requri, "?");
    if($pospar !== false) $params = substr($requri, $pospar);

    $cnt = file_get_contents($url . '/' . $fileName . $params);
    $cty = $this->getHeader($http_response_header, 'Content-Type');
    $cds = $this->getHeader($http_response_header, 'Content-Disposition');
    if(empty($cty)) {
      $cty = $this->getContentTypeByName($fileName, 'text/html');
    }

    $response = new Response();
    $response->setContent($cnt);
    $response->headers->set('Content-Type', $cty);
    if(!empty($cds)) {
      $response->headers->set('Content-Disposition', $cds);
    }

    return $response;
  }

  private function getHeader($headers, $name) {
     if(!isset($headers)) {
       return '';
     }
     $h = $name . ': ';
     $l = strlen($h);
     foreach($headers as $value) {
       if(str_starts_with($value, $h)) {
         return substr($value, $l);
       }
     }
     return '';
  }

  private function getContentTypeByName($fileName, $defval = 'application/json') {
    if(is_null($fileName)) return $defval;
    $pos = strrpos($fileName, ".");
    if ($pos === false) return $defval;
    $ext = substr($fileName, $pos);
    if(strcmp($ext, '.png') === 0) return 'image/png';
    if(strcmp($ext, '.jpg') === 0) return 'image/jpeg';
    if(strcmp($ext, '.webp') === 0) return 'image/webp';
    if(strcmp($ext, '.bmp') === 0) return 'image/bmp';
    if(strcmp($ext, '.gif') === 0) return 'image/gif';
    if(strcmp($ext, '.tif') === 0) return 'image/tiff';
    if(strcmp($ext, '.tiff') === 0) return 'image/tiff';
    if(strcmp($ext, '.svg') === 0) return 'image/svg+xml';
    if(strcmp($ext, '.htm') === 0) return 'text/html';
    if(strcmp($ext, '.html') === 0) return 'text/html';
    if(strcmp($ext, '.php') === 0) return 'text/html';
    if(strcmp($ext, '.jsp') === 0) return 'text/html';
    if(strcmp($ext, '.asp') === 0) return 'text/html';
    if(strcmp($ext, '.aspx') === 0) return 'text/html';
    if(strcmp($ext, '.css') === 0) return 'text/css';
    if(strcmp($ext, '.csv') === 0) return 'text/csv';
    if(strcmp($ext, '.txt') === 0) return 'text/plain';
    if(strcmp($ext, '.js') === 0) return 'application/javascript';
    if(strcmp($ext, '.xml') === 0) return 'application/xml';
    if(strcmp($ext, '.json') === 0) return 'application/json';
    if(strcmp($ext, '.pdf') === 0) return 'application/pdf';
    if(strcmp($ext, '.zip') === 0) return 'application/zip';
    if(strcmp($ext, '.ttf') === 0) return 'font/ttf';
    if(strcmp($ext, '.woff') === 0) return 'font/woff';
    if(strcmp($ext, '.woff2') === 0) return 'font/woff2';
    if(strcmp($ext, '.eot') === 0) return 'application/vnd.ms-fontobject';
    if(strcmp($ext, '.mp4') === 0) return 'video/mp4';
    if(strcmp($ext, '.xlsx') === 0) return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if(strcmp($ext, '.docx') === 0) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    if(strcmp($ext, '.pptx') === 0) return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    return $defval;
  }

  private function getContentType($content, $defval = 'application/json') {
    if(is_null($content)) return $defval;
    if(empty($content)) return $defval;
    $o = ord(substr($content, 0, 1));
    switch ($o) {
      case 0:   // NUL
        return 'video/mp4';
      case 37:  // %
        return 'application/pdf';
      case 60:  // <
        return 'application/xml';
      case 66:  // B
        return 'image/bmp';
      case 71:  // G
        return 'image/gif';
      case 73:  // I
        return 'image/tiff';
      case 80:  // P
        return 'application/zip';
      case 34:  // "
      case 39:  // '
      case 91:  // [
      case 123: // {
        return 'application/json';
      case 36:  // $
      case 40:  // (
      case 47:  // /
      case 102: // f (function)
      case 108: // l (let)
      case 118: // v (var)
        return 'text/javascript';
      case 35:  // #
      case 46:  // .
      case 64:  // @
          return 'text/css';
      case 82:  // R
          return 'image/webp';
      case 137:
        return 'image/png';
      case 255:
        return 'image/jpeg';
    }
    return $defval;
  }

  private function _mock(Request &$request, $url) {
    $cnt = file_get_contents($url);
    $cty = $this->getHeader($http_response_header, 'Content-Type');
    $cds = $this->getHeader($http_response_header, 'Content-Disposition');
    if(empty($cty)) {
      $cty = $this->getContentTypeByName($url, 'application/json');
    }

    $response = new Response();
    $response->setContent($cnt);
    $response->headers->set('Content-Type', $cty);
    if(!empty($cds)) {
      $response->headers->set('Content-Disposition', $cds);
    }

    return $response;
  }

  public static function cfgMock() {
    $env_val = getenv("DEMO_MOCK");
    if ($env_val !== false) {
      if(strcmp($env_val, "0") !== 0) {
        return TRUE;
      }
      else {
        return FALSE;
      }
    }
    return FALSE;
  }

  public static function cfgMockUrl() {
    $env_val = getenv("DEMO_MOCK_URL");
    if ($env_val !== false) return $env_val;
    return "https://raw.githubusercontent.com/giosil/test-data/master/sira/";
  }

  public static function cfgBaseUrl() {
    $env_val = getenv("DEMO_BASE_URL");
    if ($env_val !== false) return $env_val;
    return "https://raw.githubusercontent.com/giosil/test-data/master/sira/";
  }

  private function _log_info($message) {
    \Drupal::logger('demo')->notice($message);
  }

  private function _log_warn($message) {
    \Drupal::logger('demo')->warning($message);
  }

  private function _log_err($message) {
    \Drupal::logger('demo')->error($message);
  }

}

?>