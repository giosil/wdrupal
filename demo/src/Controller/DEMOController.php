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
    if (empty($method)) $method = "GET";

    if (strcmp($method, "GET") == 0) {
      $response = new Response();
      $response->setContent(file_get_contents($url . $params));
      $response->headers->set('Content-Type', 'application/json');

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

      $response = new Response();
      $response->setContent(file_get_contents($url . $params, false, $context));
      $response->headers->set('Content-Type', 'application/json');

      return $response;
    }
  }

  private function _mock(Request &$request, $url) {

    $response = new Response();
    $response->setContent(file_get_contents($url));
    $response->headers->set('Content-Type', 'application/json');

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