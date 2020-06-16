<?php
/**
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

namespace BNF\Migration\Helper;

use Magento\Cms\Model\BlockFactory;
use Magento\Cms\Model\PageFactory;
use Magento\Cms\Model\ResourceModel\Block as BlockResource;
use Magento\Cms\Model\ResourceModel\Page as PageResource;
use Magento\Framework\App\State as AppState;
use Scandiweb\Migration\Helper\Cms as CmsHelper;
use Scandiweb\Migration\Helper\FileParser;
use Magento\Store\Model\StoreManagerInterface;

/**
 * Class Cms
 *
 * @package Technodom\Migration\Helper
 */
class Cms extends CmsHelper
{
    /**
     * @var AppState
     */
    protected $appState;

    /**
     * @var BlockFactory
     */
    protected $blockFactory;

    /**
     * @var BlockResource
     */
    protected $blockResource;

    /**
     * @var PageFactory
     */
    protected $pageFactory;

    /**
     * @var PageResource
     */
    protected $pageResource;

    /**
     * @var StoreManagerInterface
     */
    private $storeManager;

    /**
     * @var FileParser
     */
    private $fileParser;

    /**
     * CmsHelper constructor.
     *
     * @param AppState $appState
     * @param BlockFactory $blockFactory
     * @param BlockResource $blockResource
     * @param PageFactory $pageFactory
     * @param PageResource $pageResource
     * @param FileParser $fileParser
     * @param StoreManagerInterface $storeManager
     */
    public function __construct(
        AppState $appState,
        BlockFactory $blockFactory,
        BlockResource $blockResource,
        PageFactory $pageFactory,
        PageResource $pageResource,
        FileParser $fileParser,
        StoreManagerInterface $storeManager
    ) {
        $this->appState = $appState;
        $this->blockFactory = $blockFactory;
        $this->blockResource = $blockResource;
        $this->pageFactory = $pageFactory;
        $this->pageResource = $pageResource;
        $this->fileParser = $fileParser;
        $this->storeManager = $storeManager;
    }

    /**
     * Return array with cms blocks data that is parsed from the provided file
     *
     * @param string $path
     * @return array
     * @throws \Magento\Framework\Exception\NoSuchEntityException
     */
    public function getCmsBlocksDataFromFile($path)
    {
        $data = $this->fileParser->getJSONContent($path);

        foreach ($data as &$cmsBlockData) {
            $blockContent = $this->fileParser->getHtmlContent($cmsBlockData['content']);
            if (!empty($blockContent)) {
                $cmsBlockData['content'] = $blockContent;
            }

            $cmsBlockData['stores'] = $this->getStoreId($cmsBlockData['stores']);
        }

        return $data;
    }

    /**
     * Gets store Ids
     *
     * @param int $storeCode
     * @return int
     * @throws \Magento\Framework\Exception\NoSuchEntityException
     */
    private function getStoreId($storeCode)
    {
        return $this->storeManager->getStore($storeCode)->getId();
    }
}
