<?php
namespace Beaver\BackendBundle\Controller\Ajax;

use Beaver\BackendBundle\Controller\ControllerBase;
use Beaver\BackendBundle\Form\BlockFormType;
use Beaver\CoreBundle\Response\BaseResponse;
use Doctrine\ORM\Query\ResultSetMapping;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\RequestContext;

/**
 * Class BlockController
 * @package Beaver\BackendBundle\Controller
 */
class BlockController extends ControllerBase
{
    /**
     * Returns block form.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function newModalAction(Request $request)
    {
        $page = $request->get('page');
        $area = $request->get('area');
        
        $formType = $this->get('form.factory')->create(BlockFormType::class, [
            'page'  => $page,
            'area'  => $area
        ]);
        
        $htmlContent = $this->renderView(
            '@BeaverBackend/Forms/Modal/block.html.twig', [
                'form'  => $formType->createView()
        ])->getContent();
    
        return new JsonResponse([
            'status'    => true,
            'data'      => $htmlContent
        ]);
    }
    
    /**
     * Create new block for page area.
     *
     * @param Request $request
     */
	public function saveAction(Request $request)
    {
        $formType = $this->get('form.factory')->create(BlockFormType::class);
        
        if (true === $request->isMethod(Request::METHOD_POST)) {
            $formType->handleRequest($request);
    
            $blockResponse = $this->get('beaver_core.block')->save($formType);
        }
        
        $htmlContent = '';
        if (BaseResponse::SUCCESS === $blockResponse->isSuccess()) {
            $htmlContent = $this->renderView(
                $blockResponse->getData()->getLayout(), [
                'block' => $blockResponse->getData()
            ]);
        }
    
        return new JsonResponse([
            'status'    => $blockResponse->isSuccess(),
            'data'      => $htmlContent
        ]);
    }
    
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function dropAction(Request $request)
    {
        $block = $request->get('block');
    
        $deleteResponse = $this->get('beaver_core.block')->delete($block);

        return new JsonResponse([
            'status'    => $deleteResponse->isSuccess()
        ]);
    }
    
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function publishAction(Request $request)
    {
        $block = $request->get('block');
        
        $publishResponse = $this->get('beaver_core.block')->publish($block);

        $htmlContent = '';
        if (BaseResponse::SUCCESS === $publishResponse->isSuccess()) {
            $htmlContent = $this->renderView(
                $publishResponse->getData()->getLayout(), [
                'block' => $publishResponse->getData()
            ]);
        }
        
        return new JsonResponse([
            'status'    => $publishResponse->isSuccess(),
            'data'      => $htmlContent->getContent()
        ]);
    }
    
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function moveAction(Request $request)
    {
        $blockToMove    = $request->get('blockToMove');
        $blockToReplace = $request->get('blockToReplace');
    
        $moveResponse = $this->get('beaver_core.block')->moveBlock($blockToMove, $blockToReplace);
    
        return new JsonResponse([
            'status'    => $moveResponse->isSuccess()
        ]);
    }
    
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getAction(Request $request)
    {
        $block = $request->get('block');
        
        $blockResponse = $this->get('beaver_core.block')->get($block);
        $htmlContent = '';
        if (BaseResponse::SUCCESS === $blockResponse->isSuccess()) {
            $htmlContent = $this->renderView(
                $blockResponse->getData()->getLayout(), [
                'block' => $blockResponse->getData()
            ]);
        }
        
        return new JsonResponse([
            'status'    => $blockResponse->isSuccess(),
            'data'      => $htmlContent->getContent()
        ]);
    }
}
