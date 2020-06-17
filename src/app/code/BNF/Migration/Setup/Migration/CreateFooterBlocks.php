<?php
/**
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

namespace BNF\Migration\Setup\Migration;

use Scandiweb\Migration\Api\MigrationInterface;
use Scandiweb\Migration\Helper\MediaMigration;
use Magento\Framework\Setup\SetupInterface;
use BNF\Migration\Helper\Cms;

/**
 * Class CreateNewProductsBlock
 *
 * @package Technodom\Migration\Setup\Migration
 */
class CreateFooterBlocks implements MigrationInterface
{
    /**
     *
     */
    const PATH = 'app/code/BNF/Migration/files/data/json/blocks/footer-blocks.json';

    /**
     * @var Cms
     */
    protected $cmsHelper;

    /**
     * @var MediaMigration
     */
    protected $mediaMigration;

    /**
     * CreateCategoryNewProductsBlock constructor.
     * @param Cms $cmsHelper
     * @param MediaMigration $mediaMigration
     */
    public function __construct(
        Cms $cmsHelper,
        MediaMigration $mediaMigration
    ) {
        $this->cmsHelper = $cmsHelper;
        $this->mediaMigration = $mediaMigration;
    }

    /**
     * Creating New products category heading CMS block
     *
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     * @param SetupInterface|null $setup
     * @throws \Magento\Framework\Exception\NoSuchEntityException
     */
    public function apply(SetupInterface $setup = null)
    {
        foreach ($this->cmsHelper->getCmsBlocksDataFromFile(self::PATH) as $data) {
            $this->cmsHelper->createBlock($data['identifier'], $data['content'], $data);
        }

        $mediaFiles = [
            'blocks/footer/comodo-secure.svg',
            'blocks/footer/klarna.svg'
        ];

        $this->mediaMigration->copyMediaFiles($mediaFiles, 'BNF_Migration', 'cms');
    }
}
