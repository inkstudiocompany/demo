<?php

namespace Beaver\BackendBundle\Controller;

use Beaver\BackendBundle\Form\PageFormType;
use Beaver\CoreBundle\Response\BaseResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class BackendController
 * @package Beaver\BackendBundle\Controller
 */
class BackendController extends ControllerBase
{
	/**
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function indexAction()
	{
	    return $this->render('@Backend/Backend/home.html.twig');
	}
	
	public function pagesAction()
	{
	    $pagesResponse = $this->get('beaver_backend.page')->getPages();
	    
	    if (BaseResponse::FAIL === $pagesResponse->isSuccess()) {
	        throw new \Exception($pagesResponse->getError()->getMessage());
        }
	    
		return $this->render(
            '@BeaverBackend/Backend/pages-list.html.twig', [
		    'pages' => $pagesResponse->getData()
        ]);
	}
	
	/**
	 * @param \Symfony\Component\HttpFoundation\Request $request
	 *
	 * @return \Symfony\Component\HttpFoundation\Response
	 */
	public function pageAction(Request $request)
    {
        $success = null;
    
        if (!$request->get('id')) {
            $pageFormType = $this->get('form.factory')->create(PageFormType::class);
        }
    
        if ($pageId = $request->get('id')) {
            $pageResponse = $this->get('beaver_backend.page')->getById($pageId);
        
            if (BaseResponse::SUCCESS === $pageResponse->isSuccess()) {
                $pageFormType = $this->get('form.factory')
					->create(PageFormType::class, $pageResponse->getData()->toArray());
            }
        }
        
        if (true === $request->isMethod(Request::METHOD_POST)) {
            $pageFormType->handleRequest($request);
    
            $pageResponse = $this->get('beaver_backend.page')->process($pageFormType);
            
            if ($pageResponse->isSuccess()) {
                $this->redirectToRoute('beaver.backend.page.edit', [
                	'id' => $pageResponse->getData()->getId()
                ]);
            }
            
            $success = $pageResponse->isSuccess();
        }
	    
        return $this->render('@BeaverBackend/Forms/page.html.twig', [
            'form'      => $pageFormType->createView(),
            'success'   => $success
        ]);
    }
}
