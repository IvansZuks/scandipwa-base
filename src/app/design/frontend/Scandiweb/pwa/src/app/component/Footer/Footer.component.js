/*
 * @category  Budo
 * @package   Budo_PWA
 * @author    Ivans Zuks <info@scandiweb.com>
 * @copyright Copyright (c) 2020 Scandiweb, Inc (https://scandiweb.com)
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

import PropTypes from 'prop-types';

import { Footer as BaseFooter } from 'SourceComponent/Footer/Footer.component';
import ExpandableContent from 'Component/ExpandableContent';
import CmsBlock from 'Component/CmsBlock';
import Link from 'Component/Link';
import Image from 'Component/Image';
import isMobile from 'Util/Mobile';
import klarnaIcon from './images/klarna.svg'
import comodoSecureIcon from './images/comodo-secure.svg'

import './Footer.style';

/**
 * Page footer
 * @class Footer
 */
export class Footer extends BaseFooter {
    cmsImages = [
        {
            logo_alt: 'Klarna',
            logo_src: klarnaIcon
        },
        {
            logo_alt: 'Comodo',
            logo_src: comodoSecureIcon
        }
    ]

    renterContactUs() {
        return (
            <div
                block="Footer"
                elem="ContactUs"
            >
                <ExpandableContent heading={ __('Contact Us') } >
                <div
                    block="Footer"
                    elem="ContactUs-Address"
                >
                    <p>Budo &amp; Fitness Sport AB</p>
                    <p>Staffanstorpsv&auml;gen 115</p>
                    <p>232 61 Arlöv</p>
                    <p>Org: 556053-3423</p>
                </div>
                <div
                    block="Footer"
                    elem="ContactUs-Telephones"
                >
                    <p>{ __('Customer service was 10-18') }</p>
                    <p>08-673 33 50, 040-94 88 88</p>
                </div>
                <div
                    block="Footer"
                    elem="ContactUs-Emails"
                >
                    <p>
                        { __('Customer service: ') }
                        <Link
                            block="Footer"
                            elem="EmailLink"
                            to="mailto:info@budofitness.se"
                        >
                            kundservice@budofitness.se
                        </Link>
                    </p>
                    <p>
                        { __('Questions: ') }
                        <Link
                            block="Footer"
                            elem="EmailLink"
                            to="mailto:info@budofitness.se"
                        >
                            info@budofitness.se
                        </Link>
                    </p>
                </div>
            </ExpandableContent>
            </div>
        );
    }

    renderContent() {
        const { footer_content: { footer_cms } = {} } = window.contentConfiguration;

        if (footer_cms) {
            return <CmsBlock identifiers={ [footer_cms] } />;
        }

        let self = this;

        const footerLinks = {
            'Information': [
                'Om Budo & Fitness',
                'Leveranser & returer',
                'Allmänna köpvillkor',
                'Betalning',
                'Privacy Policy',
                'Partner/Affiliate',
                'Franchise',
                'Team Budofitness',
                'Free jobs',
                'Credit application',
                'The Budofitness card',
                'Budofitness FAQ'
            ],
            'Shops / Departments': [
                'Shops with map',
                'Sthlm Sveavägen City',
                'Sthlm Megastore Västberga',
                'Uppsala',
                'Göteborg',
                'Malmö',
                'Club Purchase',
                'Companies Exercise',
                'Wholesale Department',
                'Service / Installation',
                'Powered by Budofitness'
            ],
            'Products / Categories': [
                'Martial Arts products',
                'Martial arts style',
                'Kampsportsgym',
                'Supplements',
                'Supplements package',
                'Training Equipment',
                'Workout clothes',
                'Weightlifting Shoes',
                'Trademarks',
                'Bargain',
                'Clearance',
                'Promotions'
            ]
        }

        return (
            <>
                <div
                    block="Footer"
                    elem="LinkList"
                >
                    { Object.keys(footerLinks).map((key) => self.renderListHtml(key, footerLinks[key])) }
                    { this.renterContactUs() }
                    { this.renderPaymentBlock() }
                </div>
            </>
        );
    }

    renderListHtml(key, items) {
        return (
            <ExpandableContent heading={ __(key) }>
                <ul>
                    { items.map(function (item) {
                        return (
                            <li>
                                <Link
                                    block="Footer"
                                    elem="Link"
                                    to="/"
                                >
                                    { __(item) }
                                </Link>
                            </li>
                        );
                    }) }
                </ul>
            </ExpandableContent>
        )
    }

    renderPaymentBlock() {
        return (
            <div
                block="Footer"
                elem="CmsImages"
            >
                <h4>{ __('Nyhetsbrev') }</h4>
                { this.cmsImages.map(({ logo_src, logo_alt}) => {
                    return (
                        <div
                            block="Footer"
                            elem={ logo_alt }
                        >
                            <Image
                                alt={ logo_alt }
                                src={ logo_src }
                                ratio="16x9"
                            />
                        </div>
                    )
                }) }
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
