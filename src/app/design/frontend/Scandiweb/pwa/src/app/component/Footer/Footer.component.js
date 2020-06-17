/**
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import { Footer as BaseFooter } from 'SourceComponent/Footer/Footer.component';
import ExpandableContent from 'Component/ExpandableContent';
import CmsBlock from 'Component/CmsBlock';
import Link from 'Component/Link';
import isMobile from 'Util/Mobile';

import './Footer.style';

/**
 * Page footer
 * @class Footer
 */
export class Footer extends BaseFooter {
    renterContactUs() {
        const { footer_content: { footer_contact_us } = {} } = window.contentConfiguration;

        return (
            <div
                block="Footer"
                elem="ContactUs"
            >
                <ExpandableContent heading={ __('Contact Us') } >
                    <CmsBlock identifiers={ [footer_contact_us || 'footer-contact-us'] } />
                </ExpandableContent>
            </div>
        );
    }

    renderContent() {
        const { footer_content: { footer_cms } = {} } = window.contentConfiguration;

        if (footer_cms) {
            return <CmsBlock identifiers={ [footer_cms] } />;
        }

        return (
            <>
                <div
                    block="Footer"
                    elem="LinkList"
                >
                    { this.renderListHtml() }
                    { this.renterContactUs() }
                    { this.renderPaymentBlock() }
                </div>
            </>
        );
    }

    renderListHtml() {
        const { footer_content:
            {
                footer_information_block,
                footer_shops_block,
                footer_catalog_block
            } = {}
        } = window.contentConfiguration;

        return (
            <>
                <ExpandableContent heading={ __('Information') }>
                    <CmsBlock identifiers={ [footer_information_block || 'footer-information-block'] } />
                </ExpandableContent>
                <ExpandableContent heading={ __('Shops / Departments') }>
                    <CmsBlock identifiers={ [footer_shops_block || 'footer-shops-block'] } />
                </ExpandableContent>
                <ExpandableContent heading={ __('Products / Categories') }>
                    <CmsBlock identifiers={ [footer_catalog_block || 'footer-catalog-block'] } />
                </ExpandableContent>
            </>
        )
    }

    renderPaymentBlock() {
        const { footer_content: { footer_images_block } = {} } = window.contentConfiguration;

        return (
            <div
                block="Footer"
                elem="CmsImages"
            >
                <h4>{ __('Nyhetsbrev') }</h4>
                <CmsBlock identifiers={ [footer_images_block || 'footer-payment-images'] } />
            </div>
        );
    }

    render() {
        const { copyright, isVisibleOnMobile } = this.props;

        if (!isVisibleOnMobile && isMobile.any()) {
            return null;
        }

        if (isVisibleOnMobile && !isMobile.any()) {
            return null;
        }

        return (
            <footer block="Footer" aria-label="Footer">
                { this.renderContent() }
                <span block="Footer" elem="Copyright">
                    { copyright }
                </span>
            </footer>
        );
    }
}

export default middleware(Footer, 'Component/Footer/Component');
