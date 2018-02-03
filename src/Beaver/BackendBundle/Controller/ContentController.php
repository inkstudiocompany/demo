<?php

namespace Beaver\BackendBundle\Controller;

use Beaver\BackendBundle\Form\PageFormType;
use Beaver\CoreBundle\Response\ArrayResponse;
use Beaver\CoreBundle\Response\BaseResponse;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class ContentController
 * @package Beaver\BackendBundle\Controller
 */
class ContentController extends ControllerBase
{
    /**
     * @param Request $request
     */
	public function listAction(Request $request)
	{
	    $content = $request->get('content');

	    /** @var ArrayResponse $contentResponse */
	    $contentResponse = $this->get('beaver_contents.contents')->getContentsByType($content);

	    return $this->render('@BeaverBackend/Backend/content-list.html.twig', [
	        'content'   => $contentResponse->getData(),
            'type'      => $content
        ]);
	}

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
	public function newAction(Request $request)
    {
        $content = $request->get('content');

        /** @var Form $form */
        $form = $this->get('beaver_contents.contents')->form($content);

        $form->handleRequest($request);

        if (true === $form->isSubmitted()) {
            $saveResponse = $this->get('beaver_contents.contents')->save($form);
            if (BaseResponse::SUCCESS === $saveResponse->isSuccess()) {
                return $this->redirectToRoute('beaver.backend.edit', [
                    'content'   => $content,
                    'id'        => $saveResponse->getData()->getId(),
                    'created'   => true
                ]);
            }
        }

        return $this->render($this->get('beaver_contents.contents')->getContentManager($content)->formView(), [
            'form'  => $form->createView(),
            'type'  => $content
        ]);
    }

    /**
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function editAction(Request $request)
    {
        $content = $request->get('content');

        $data = [];
        /** @var BaseResponse $contentResponse */
        $contentResponse = $this->get('beaver_contents.contents')->get($content, $request->get('id'));
        if (BaseResponse::SUCCESS === $contentResponse->isSuccess()) {
            $data = $contentResponse->getData()->toArray();
        }

        /** @var Form $form */
        $form = $this->get('beaver_contents.contents')->form($content, $data);

        $form->handleRequest($request);

        $params = [
            'form'      => $form->createView(),
            'type'      => $content
        ];

        if ($request->get('created')) {
            $params['status']   = BaseResponse::SUCCESS;
            $params['message']  = 'Contenido creado correctamente!';
        }

        if (true === $form->isSubmitted()) {
            $saveResponse = $this->get('beaver_contents.contents')->save($form);
            $params['status']   = $saveResponse->isSuccess();
            if (BaseResponse::FAIL === $saveResponse->isSuccess()) {
                $params['message']  = $saveResponse->getError()->getMessage();
            }
        }

        return $this->render('@BeaverBackend/Forms/content.html.twig', $params);
    }

    /**
     * @param Request $request
     */
    public function deleteAction(Request $request)
    {
        $content = $request->get('content');

        $contentResponse = $this->get('beaver_contents.contents')->delete($content, $request->get('id'));

        if (BaseResponse::SUCCESS === $contentResponse->isSuccess()) {
            return $this->redirectToRoute('beaver.backend.contents', ['content' => $content]);
        }
    }
}
