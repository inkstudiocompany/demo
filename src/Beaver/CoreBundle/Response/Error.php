<?php
/**
 * Created by PhpStorm.
 * User: leonardojsuarez
 * Date: 2/11/17
 * Time: 20:11
 */

namespace Beaver\CoreBundle\Response;

/**
 * Class Error
 * @package Beaver\CoreBundle\Response
 *
 * Error para las respuestas de los servicios.
 */
class Error
{
	const ITEM_NOT_FOUND_CODE       = 101;
	const ITEM_NOT_FOUND_MESSAGE    = 'El item buscado no se encuentra';
	
	public function __construct($code = null, $message = null)
	{
		$this->setCode($code);
		$this->setMessage($message);
	}
	
	/**
	 * @var integer
	 */
	private $code;
	
	/**
	 * @var string
	 */
	private $message;
	
	/**
	 * @return int
	 */
	public function getCode()
	{
		return $this->code;
	}
	
	/**
	 * @param int $code
	 */
	public function setCode($code)
	{
		$this->code = $code;
		return $this;
	}
	
	/**
	 * @return string
	 */
	public function getMessage()
	{
		return $this->message;
	}
	
	/**
	 * @param string $message
	 */
	public function setMessage($message)
	{
		$this->message = $message;
		return $this;
	}
}