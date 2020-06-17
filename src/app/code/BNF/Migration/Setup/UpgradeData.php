<?php
/**
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

namespace BNF\Migration\Setup;

use BNF\Migration\Setup\Migration\ChangeCopyright;
use BNF\Migration\Setup\Migration\CreateFooterBlocks;
use Scandiweb\Migration\Setup\AbstractUpgradeData;

class UpgradeData extends AbstractUpgradeData
{
    protected $migrations = [
        '1.0.0' => ChangeCopyright::class,
        '1.0.2' => CreateFooterBlocks::class,
    ];
}
