<?php
/**
 * Created by PhpStorm.
 * User: leonardojsuarez
 * Date: 2/11/17
 * Time: 20:07
 */

namespace Beaver\CoreBundle\Response\Interfaces;

use Beaver\CoreBundle\Response\Error;

/**
 * Class ResponseInterface
 * @package Beaver\CoreBundle\Response
 *
 * Define la interfaz de las respuestas generadas por los servicios.
 */
interface ResponseInterface
{
	/**
	 * Retorna el TRUE si la respuesta es válida, FALSE si se generó algún error.
	 * @return bool
	 */
	public function isSuccess();
	
	/**
	 * Retorna el TRUE si la respuesta es válida, FALSE si se generó algún error.
	 * @return bool
	 */
	public function State();
	
	/**
	 * Setea el estado de la respuesta.
	 * @param bool $status
	 * @return mixed
	 */
	public function setStatus($status);
	
	/**
	 * Retorna el error generado. Si no existe retorna false.
	 * @return Error|bool
	 */
	public function getError();
	
	/**
	 * Agrega el error si existe.
	 * @return mixed
	 */
	public function setError(Error $error);
	
	/**
	 * Prepara la respuesta para ser enviada.
	 * @param $Data
	 * @param $error
	 * @return mixed
	 */
	public function prepareResponse($Data, Error $error = null);
	
	/**
	 * Agrega los datos al contenedor.
	 * @param $data
	 * @return mixed
	 */
	public function setData($data);
}