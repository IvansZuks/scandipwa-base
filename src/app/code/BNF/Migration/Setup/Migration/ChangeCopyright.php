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
use Magento\Framework\Setup\SetupInterface;
use Magento\Framework\App\Config\Storage\WriterInterface;

class ChangeCopyright implements MigrationInterface
{
    /**
     * @var WriterInterface
     */
    protected $configWriter;

    /**
     * ChangeCopyright constructor.
     * @param WriterInterface $configWriter
     */
    public function __construct(WriterInterface $configWriter)
    {
        $this->configWriter = $configWriter;
    }

    /**
     * @param SetupInterface|null $setup
     */
    public function apply(SetupInterface $setup = null)
    {
        $this->configWriter->save(
            'design/footer/copyright',
            '© 2020 Budo & Fitness Sport. All Rights Reserved.'
        );
    }
}
