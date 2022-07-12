<?php

namespace Drupal\olm\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class OLMController {
  
  public function content() {
    $lnk_c = '<a id="lnk-c" class="olm-links">Clear</a>';
    $lnk_m = '<a id="lnk-m" class="olm-links">Markers</a>';
    $lnk_p = '<a id="lnk-p" class="olm-links">Polygon</a>';
    $lnk_z = '<a id="lnk-z" class="olm-links">Zoom</a>';
    $div_links = '<div>' . $lnk_c . ' | ' . $lnk_m . ' | ' . $lnk_p . ' | ' . $lnk_z . '</div>';

    $div_map = '<div id="olm-map"></div>';

    $span_out = 'Feature name: <span id="lbl-out" class="olm-label"></span>';

    return array(
      '#markup' => $div_links . '<hr>' . $div_map . '<hr>' . $span_out
    );
  }

  public function rss(Request $request) {

    return $this->_send($request, "https://www.openstreetmap.org/traces/rss", 'application/rss+xml; charset=utf-8');

  }

  private function _send(Request &$request, $url, $contentType = 'application/json') {

    $requri = $request->getRequestUri();
    $method = $request->getMethod();
    $params = "";
    $pospar = strpos($requri, "?");
    if($pospar !== false) $params = substr($requri, $pospar);
    if (empty($method)) $method = "GET";

    if (strcmp($method, "GET") == 0) {
      $response = new Response();
      $response->setContent(file_get_contents($url . $params));
      $response->headers->set('Content-Type', $contentType);

      return $response;
    }
    else {
      $opts = array('http' =>
      array(
            'method'  => $method,
            'header'  => 'Content-Type: ' . $contentType,
            'content' => $request->getContent()
        )
      );

      $context  = stream_context_create($opts);

      $response = new Response();
      $response->setContent(file_get_contents($url . $params, false, $context));
      $response->headers->set('Content-Type', $contentType);

      return $response;
    }
  }

  private function _log_info($message) {
    \Drupal::logger('olm')->notice($message);
  }

  private function _log_warn($message) {
    \Drupal::logger('olm')->warning($message);
  }

  private function _log_err($message) {
    \Drupal::logger('olm')->error($message);
  }

}

?>