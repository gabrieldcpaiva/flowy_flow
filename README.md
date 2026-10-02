# Flowy Storefront

A finite, responsive Brazilian Portuguese storefront built on the existing React 19, Vite 7, and Tailwind CSS 4 project. The application entry point remains `src/App.tsx`. Only self-hosted font packages were added; no motion framework, analytics, or external API is required.

## Brand Sources and Choices

The supplied visual references show handwritten Flowy wordmarks, a cream-on-midnight monogram, a blue-and-gold wave emblem, and a warm illustrated character in a tranquil mountain bay. These references inform the cream, seafoam, navy, and restrained gold palette, flowing lettering, and calm landscape.

Original attachment files were not present in the project filesystem. The assets in `public/brand/` are local vector interpretations of the supplied references, not claims to be original brand exports. Their lettering, descenders, and marks are displayed without cropping. Replace these with the owner's original SVG or transparent PNG files before final brand sign-off. The supplied illustrated character is not portrayed as a real person or fabricated founder portrait.

`public/images/flowy-landscape.jpg` is a generated, illustrative landscape. It is not a photograph of company premises or a claim about the business's location. Product names Flow Conversa, Flow Rotina, and Flow Companhia are proposed explanatory names for the three services described in the brief.

No written brand manual, authentic personal photograph, official contact address, WhatsApp number, prices, testimonials, client logos, company credentials, or performance data were supplied. None have been invented.

## Functional Features

- Responsive desktop navigation and mobile menu with Escape and outside-click dismissal.
- Three keyboard-accessible demonstration tabs with arrow, Home, and End navigation.
- A local scripted conversation with functional quick replies, text entry, and reset.
- Two selectable automation scenarios with a local step-by-step simulation.
- Three explicitly fictitious digital agents with selectable voice and expandable responses.
- Accessible FAQ disclosure buttons.
- Native modal dialogs with focus containment, Escape dismissal, return focus, and scroll locking.
- A validated local briefing builder with service preselection, edit, clipboard fallback, and UTF-8 text-file download.
- An accurate privacy explanation of the implementation.
- Restrained entrance, scroll-reveal, and interaction motion, disabled by reduced-motion preferences.
- Local fonts, descriptive image text, visible keyboard focus, and a skip link.

## Contact and Data

There is no configured official contact destination or submission backend. All primary actions open the briefing builder instead of pretending to send a lead or open WhatsApp. This limitation is stated before the user completes the form, in the FAQ, and beside the final conversion action.

Briefing data is held only in React component state. It is not sent, stored in local storage, or persisted after the dialog is closed or the page is reloaded. Clipboard and download are initiated by the user. Demo messages never leave the browser. There are no analytics or tracking cookies implemented.

## Owner Handoff

1. Supply original brand exports, written brand rules, and an approved personal photo if one should be used.
2. Approve the proposed product names, Portuguese copy, and illustrative landscape.
3. Provide the official WhatsApp destination or another verified contact channel. Replace the temporary local-briefing limitation with the verified destination only after it is supplied.
4. If a form backend is required, provide its endpoint, retention rules, and privacy information. Do not label the current flow as a submitted inquiry.
5. Confirm company/legal information and any genuine prices or proof before adding them.
6. Complete a real-browser check at desktop and mobile widths, including clipboard/download permissions and native dialog behavior. The current tool environment provides file review and production builds, but no browser automation or viewport-capture tool.

## Review Targets

The responsive stylesheet explicitly covers desktop, tablet, 700px mobile, and 390px small-phone layouts, with a 320px minimum. Check 1440px and 1280px desktop, 768px tablet, and 390px and 320px phone widths. Confirm no horizontal overflow, keyboard-only navigation, modal focus containment, visible validation errors, FAQ state, all three demo tabs, reduced motion, and copy/download results.

## Verification and Deployment

Source review covered responsive sizing, legibility and contrast choices, navigation targets, modal focus restoration, timer cleanup, local validation, and accessible state labels. A narrow-screen wordmark sizing issue and a hidden mobile-trigger focus-return issue were corrected. All public brand and image assets were confirmed in the production output.

Vite was updated through the package installer from 7.3.2 to 7.3.6, preserving the existing major version and configuration and removing the reported high-severity dependency warning. The installer still reports one low-severity dependency warning; obtain the detailed npm audit report and review it before deployment. No detailed audit-command tool is available in this environment.

No browser-driven visual checks or end-to-end interaction tests were run because the supplied tools do not include a browser. The production build is the executable verification available here; real desktop/mobile, native-dialog, clipboard, and download checks remain owner handoff tasks.

Deploy the entire `dist/` directory, not just `dist/index.html`. The existing single-file plugin inlines application code, styles, and font data, while brand SVGs and the landscape remain in `dist/brand/` and `dist/images/`.