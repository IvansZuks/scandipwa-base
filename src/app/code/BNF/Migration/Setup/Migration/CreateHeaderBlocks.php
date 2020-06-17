<?php
/**
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

namespace BNF\Migration\Setup\Migration;

use Magento\Framework\Exception\NoSuchEntityException;
use Scandiweb\Migration\Api\MigrationInterface;
use Magento\Framework\Setup\SetupInterface;
use BNF\Migration\Helper\Cms;

/**
 * Class CreateNewProductsBlock
 *
 * @package Technodom\Migration\Setup\Migration
 */
class CreateHeaderBlocks implements MigrationInterface
{
    /**
     *
     */
    const PATH = 'app/code/BNF/Migration/files/data/json/blocks/header-blocks.json';

    /**
     * @var Cms
     */
    protected $cmsHelper;

    /**
     * CreateCategoryNewProductsBlock constructor.
     * @param Cms $cmsHelper
     */
    public function __construct(
        Cms $cmsHelper
    ) {
        $this->cmsHelper = $cmsHelper;
    }

    /**
     * Creating New products category heading CMS block
     *
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     * @param SetupInterface|null $setup
     * @throws NoSuchEntityException
     */
    public function apply(SetupInterface $setup = null)
    {
        foreach ($this->cmsHelper->getCmsBlocksDataFromFile(self::PATH) as $data) {
            $this->cmsHelper->createBlock($data['identifier'], $data['content'], $data);
        }
    }
}
