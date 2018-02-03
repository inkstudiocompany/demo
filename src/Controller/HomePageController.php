<?php
/**
 * Created by PhpStorm.
 * User: leonardojsuarez
 * Date: 03/02/2018
 * Time: 11:55
 */
namespace Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class HomePageController
 *
 * @package Controller
 */
class HomePageController extends AbstractController
{
    /**
     * @return Response
     */
    public function index()
    {
        return $this->render('home.html.twig', [
            'content'   => 'Hi guys! I am upgrading to Symfony4! Whooo!'
        ]);
    }
}
