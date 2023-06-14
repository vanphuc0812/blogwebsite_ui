// import { useEffect, useState, useRef } from 'react';

// export function useHeadsObserver() {
//     const [activeId, setActiveId] = useState('');
//     const observer = useRef();

//     useEffect(() => {
//         const handleObserver = (entries) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     setActiveId(entry.target.id);
//                 }
//             });
//         };

//         observer.current = new IntersectionObserver(handleObserver, {
//             rootMargin: '0px 0px 100px 0px',
//             threshold: 1,
//         });

//         const elements = document.querySelectorAll('h1, h2, h3, h4');
//         elements.forEach((elem) => observer.current.observe(elem));

//         return () => {
//             if (observer.current) {
//                 observer.current.disconnect();
//             }
//         };
//     }, []);

//     return { activeId };
// }
