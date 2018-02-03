<?php
namespace Beaver\CoreBundle\Response;

use Beaver\CoreBundle\Model\Interfaces\ModelInterface;
use Beaver\CoreBundle\Response\Interfaces\ResponseInterface;

class BaseResponse implements ResponseInterface
{
	/**
	 * CONSTANTS
	 */
	const SUCCESS   =  true;
	const FAIL      = false;
	
	/**
	 * @var null
	 */
	protected $data = null;
	
	/**
	 * @var bool
	 */
	private $status = self::SUCCESS;
	
	/**
	 * @var Error
	 */
	private $error = false;
	
	/**
	 * Retorna el TRUE si la respuesta es válida, FALSE si se generó algún error.
	 * @return bool
	 */
	public function isSuccess()
	{
		return $this->State();
	}
	
	/**
	 * Retorna el TRUE si la respuesta es válida, FALSE si se generó algún error.
	 * @return bool
	 */
	public function State()
	{
		return $this->status;
	}
	
	public function setStatus($status)
	{
		$this->status = $status;
	}
	
	/**
	 * Retorna el error generado. Si no existe retorna false.
	 * @return Error|bool
	 */
	public function getError()
	{
		if (true === $this->error instanceof Error) {
			return $this->error;
		}
		
		return false;
	}
	
	/**
	 * Agrega el error si existe.
	 * @return mixed
	 */
	public function setError(Error $error)
	{
		if (true === $error instanceof Error) {
			$this->error = $error;
			$this->setStatus(self::FAIL);
		}
		
		return $this;
	}
	
	/**
	 * Agrega los datos a la respuesta.
	 * @param $data
	 * @return $this
	 */
	public function setData($data)
	{
		$this->data = $data;
		return $this;
	}
	
	/**
	 * Retorna los datos contenidos en la respuesta.
	 * @return mixed
	 */
	public function getData()
	{
		return $this->data;
	}
	
	/**
	 * Prepara la respuesta para ser enviada.
	 * @param $Data
	 * @param $error
	 * @return $this
	 */
	public function prepareResponse($Data, Error $error = null)
	{
		if (true === $error instanceof Error) {
			$this->setStatus(self::FAIL);
			$this->setError($error);
		}
		
		$this->setData($Data);
		
		return $this;
	}
	
	public function reset()
    {
        $this->data = null;
        $this->error = null;
        $this->status = self::SUCCESS;
    }

    /**
     * @return bool
     */
    public function isEmpty()
    {
        if (true === is_null($this->data) || true === empty($this->data)) {
            return true;
        }

        return false;
    }
    
    /**
     * @return array
     */
    public function toArray()
    {
        $data = $this->getData();
        if (true === $this->getData() instanceof ModelInterface) {
            $data = $this->getData()->toArray();
        }
        $error = null;
        if ($this->getError()) {
            $error = [
                'code'      => $this->getError()->getCode(),
                'message'   => $this->getError()->getMessage()
            ];
        }
        
        return [
            'status'    => $this->isSuccess(),
            'error'     => $error,
            'data'      => $data
        ];
    }
}
