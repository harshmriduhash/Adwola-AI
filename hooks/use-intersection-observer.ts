import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverProps {
	threshold?: number;
	root?: Element | null;
	rootMargin?: string;
	triggerOnce?: boolean;
}

export function useIntersectionObserver({
	threshold = 0,
	root = null,
	rootMargin = "0%",
	triggerOnce = false,
}: UseIntersectionObserverProps = {}) {
	const [isVisible, setIsVisible] = useState(false);
	const [hasTriggered, setHasTriggered] = useState(false);
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		// If triggerOnce is true and we've already triggered, don't observe again
		if (triggerOnce && hasTriggered) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const isIntersecting = entry.isIntersecting;
				setIsVisible(isIntersecting);

				if (triggerOnce && isIntersecting) {
					setHasTriggered(true);
				}
			},
			{
				threshold,
				root,
				rootMargin,
			},
		);

		observer.observe(element);

		return () => {
			if (element) {
				observer.unobserve(element);
			}
		};
	}, [threshold, root, rootMargin, triggerOnce, hasTriggered]);

	return [ref, isVisible, hasTriggered] as const;
}
