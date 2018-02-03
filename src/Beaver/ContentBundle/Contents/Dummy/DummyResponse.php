<?php
/**
 * Created by PhpStorm.
 * User: leonardojsuarez
 * Date: 10/3/17
 * Time: 00:49
 */

namespace Beaver\ContentBundle\Contents\Dummy;

use Beaver\CoreBundle\Response\BaseResponse;
use Beaver\CoreBundle\Response\Error;

/**
 * Class BannerResponse
 * @package Beaver\ContentBundle\Banner
 */
class DummyResponse extends BaseResponse
{
    /**
     * @param \Beaver\ContentBundle\Entity\Dummy $data
     * @return $this
     */
    public function setData($data)
    {
        if (true === is_null($data)) {
            return $this;
        }

        if (false === $data instanceof \Beaver\ContentBundle\Entity\Dummy)
        {
            $this->setError(new Error('Expected a \Beaver\ContentBundle\Entity\Dummy'));
            $this->setStatus(BaseResponse::FAIL);
            return $this;
        }

        $dummy = new Dummy();
        $dummy
            ->setId($data->getId())
            ->setDummyAttribute($data->getAttribute())
            ->setPublished($data->getPublished())
        ;

        $this->data = $dummy;

        return $this;
    }
}