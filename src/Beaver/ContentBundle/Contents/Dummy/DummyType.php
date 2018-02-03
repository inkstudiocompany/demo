<?php
/**
 * Created by PhpStorm.
 * User: leonardojsuarez
 * Date: 10/7/17
 * Time: 18:14
 */

namespace Beaver\ContentBundle\Contents\Dummy;

use Beaver\ContentBundle\Base\Form\AbstractContentType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;

/**
 * Class BannerType
 * @package Beaver\ContentBundle\Banner
 */
class DummyType extends AbstractContentType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    protected function buildContentForm(FormBuilderInterface $builder, array $options)
    {
        if (true === isset($options['data']['id'])) {
            $builder->add('id', HiddenType::class);
        }

        $builder
            ->add('attribute', TextareaType::class, [
                'label' => false,
                'attr'  => [

                    'class' => 'editor'
                ]
            ])
        ;
    }

    /**
     *
     */
    protected function getType()
    {
        return Dummy::TYPE;
    }


}
