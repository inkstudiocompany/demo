<?php
/**
 * Created by PhpStorm.
 * User: leonardojsuarez
 * Date: 6/29/17
 * Time: 01:17
 */

namespace Beaver\CoreBundle\Service;


use Beaver\CoreBundle\Model\Interfaces\ModelInterface;
use Beaver\CoreBundle\Response\BaseResponse;
use Beaver\CoreBundle\Response\Error;
use Beaver\CoreBundle\Response\Interfaces\ResponseInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

abstract class WebComponentAbstractService
{
    /**
     * @param $componentId
     * @return BlockResponse|mixed
     */
    public function publish($componentId)
    {
        $publishResponse = $this->makeResponse();

        try {
            $componentEntity = $this->entityManager->getRepository($this->getEntityComponent())->find($componentId);
            if (!$componentEntity) {
                return $publishResponse
                    ->setError(new Error(JsonResponse::HTTP_NOT_FOUND, 'No se encontró el componente.'));
            }
            
            $componentEntity->setPublished(!$componentEntity->getPublished());
            $this->entityManager->flush();
            
            if (BaseResponse::SUCCESS === $publishResponse->prepareResponse($componentEntity)->isSuccess()) {
                $this->setInfo($publishResponse->getData());
            }
        } catch (\Exception $exception) {
            $publishResponse->setError(New Error($exception->getCode(), $exception->getMessage()));
        }
        
        return $publishResponse;
    }
    
    /**
     * @return ResponseInterface
     */
    abstract protected function makeResponse();
    
    /**
     * @return mixed
     */
    abstract protected function getEntityComponent();

    /**
     * @param ModelInterface $component
     * @return mixed
     */
    abstract public function setInfo(ModelInterface $component);
}