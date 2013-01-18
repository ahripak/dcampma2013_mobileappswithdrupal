<?php
/**
 * @file
 * todo4u.features.inc
 */

/**
 * Implements hook_views_api().
 */
function todo4u_views_api() {
  return array("version" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function todo4u_node_info() {
  $items = array(
    'todo' => array(
      'name' => t('todo'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('todo'),
      'help' => '',
    ),
  );
  return $items;
}
