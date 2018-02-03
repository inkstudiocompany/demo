<?php
/**
 * Created by PhpStorm.
 * User: leonardojsuarez
 * Date: 2/11/17
 * Time: 19:56
 */
namespace Beaver\CoreBundle\Service;

use Beaver\CoreBundle\Entity\Page as PageEntity;
use Beaver\CoreBundle\Model\Interfaces\ModelInterface;
use Beaver\CoreBundle\Model\Page\AbstractComponent;
use Beaver\CoreBundle\Model\Page\Area;
use Beaver\CoreBundle\Model\Page\Block;
use Beaver\CoreBundle\Model\Page\Page;
use Beaver\CoreBundle\Response\ArrayResponse;
use Beaver\CoreBundle\Response\BaseResponse;
use Beaver\CoreBundle\Response\Error;
use Beaver\CoreBundle\Response\PageResponse;
use Doctrine\ORM\EntityManager;

/**
 * Class PageService
 * @package Beaver\CoreBundle\Service
 *
 * Servicio para el manejo de páginas
 */
class PageService extends WebComponentAbstractService
{
	/** @var EntityManager $em */
	protected $entityManager;
	
	/** @var  LayoutService */
	protected $layoutService;
	
	/** @var BlockService */
	protected $blockService;
	
	/** @var  ContextService */
	protected $contextService;
	
	public function __construct(
	    EntityManager $entityManager,
        LayoutService $layoutService,
        BlockService $blockService,
        ContextService $contextService
    ) {
		$this->entityManager    = $entityManager;
		$this->layoutService    = $layoutService;
		$this->blockService     = $blockService;
		$this->contextService   = $contextService;
	}
    
    function makeResponse()
    {
        return new PageResponse();
    }
    
    function getEntityComponent()
    {
        return PageEntity::class;
    }
    
    /**
     * @return ArrayResponse
     */
	public function getPages()
    {
        $pagesArrayResponse = new ArrayResponse();
    
        $pagesEntity = $this->entityManager->getRepository(PageEntity::class)->findAll();
        if (!$pagesEntity) {
            $pagesArrayResponse->prepareResponse($pagesEntity,
                new Error(Error::ITEM_NOT_FOUND_CODE, Error::ITEM_NOT_FOUND_MESSAGE));
        }
    
        $pageResponse = new PageResponse();
        foreach ($pagesEntity as $pageEntity) {
            if (BaseResponse::SUCCESS === $pageResponse->setData($pageEntity)->isSuccess()) {
                $pagesArrayResponse->addItem($pageResponse->getData());
                $pageResponse->reset();
            }
        }
    
        return $pagesArrayResponse;
    }
    
    /**
     * @param $slug
     * @return PageResponse|mixed
     */
	public function getPage($slug)
	{
		$pageResponse = new PageResponse();
		
		$pageEntity = $this->entityManager->getRepository(PageEntity::class)->findOneBy([
			'slug'  => $slug
		]);
		
		if (!$pageEntity) {
			$pageResponse->prepareResponse($pageEntity,
                new Error(Error::ITEM_NOT_FOUND_CODE, Error::ITEM_NOT_FOUND_MESSAGE));
			return $pageResponse;
		}
        
        $this->additionalInfo($pageResponse->prepareResponse($pageEntity)->getData());
		
		return $pageResponse;
	}
    
    /**
     * Add information to the component.
     *
     * @param Page $page
     */
	public function additionalInfo(Page $page)
    {
        if (false === $page instanceof Page) {
            return false;
        }
        
        $layoutResponse = $this->layoutService->getLayout($page->getLayout());
        
        if (BaseResponse::SUCCESS === $layoutResponse->isSuccess()) {
            $page->setLayout($layoutResponse->getData());
        }

        $this->blockService->setComponents($page);

        /** @var Area $area */
        foreach ($page->getLayout()->getAreas() as $area) {
            /** @var Block $block */
            foreach ($area->getBlocks() as $block) {
                $this->blockService->setInfo($block);
            }
        }
        
        return $page;
    }

    public function setInfo(ModelInterface $component)
    {
        // TODO: Implement setInfo() method.
    }


}