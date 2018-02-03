<?php
/**
 * Created by PhpStorm.
 * User: leonardojsuarez
 * Date: 11/4/17
 * Time: 00:19
 */
namespace Beaver\CoreBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\Exception\IOException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

/**
 * Class InstallCommand
 * @package Beaver\CoreBundle\Command
 */
class InstallAssetsCommand extends ContainerAwareCommand
{
    private $temporal = './beaverDev/';

    protected function configure()
    {
        $this
            ->setName('beaver:install-assets')
            ->setDescription('Compila y copia los assets necesarios para el CMS.')
            ->addOption('mode', 'prod', InputOption::VALUE_OPTIONAL,'', 'prod')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $fs = new Filesystem();

        try {
            $environment = $input->getOption('mode');
            $output->writeln($environment);

            $output->writeln('Beaver Install Assets');
            $output->writeln('====================');

            $output->writeln('Creando directorios...');
            $fs->remove('web/bundles/beaverBackend/fonts');
            $fs->remove('web/bundles/beaverBackend/images');
            $fs->remove('web/bundles/beaverBackend/css');
            $fs->remove('web/bundles/beaverBackend/js');

            $fs->mkdir('web/bundles/beaverBackend/fonts');
            $fs->mkdir('web/bundles/beaverBackend/images');
            $fs->mkdir('web/bundles/beaverBackend/css');
            $fs->mkdir('web/bundles/beaverBackend/js');

            $output->writeln('Corriendo tareas Gulp...');
            $process = new Process('gulp --gulpfile ' . $this->temporal . 'gulpfile.js --env=' . $environment);

            $process->start(function ($type, $buffer) {
                if (Process::ERR === $type) {
                    echo $buffer;
                } else {
                    echo $buffer;
                }
            });

            while ($process->isRunning()) {
                echo '';
            }

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }

            $output->writeln('Assets instalados correctamente.');
            echo $process->getOutput();
        } catch (IOException $exception) {
            echo 'Error ' . $exception->getMessage();
        }
    }
}