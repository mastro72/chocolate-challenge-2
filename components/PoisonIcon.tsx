
import React from 'react';

const PoisonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6z"/>
        <path d="M14.121 8.464l-4.242 4.242-1.414-1.414 4.242-4.242zm-2.828 0l1.414 1.414-4.242 4.242-1.414-1.414z"/>
        <circle cx="9" cy="12" r="1"/>
        <circle cx="15" cy="12" r="1"/>
        <path d="M12 14c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"/>
    </svg>
);

export default PoisonIcon;
