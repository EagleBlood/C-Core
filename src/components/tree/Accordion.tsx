import { AccordionProps } from "./Accordion.props";

const Accordion: React.FC<AccordionProps> = ({controllerElement, children, isExpanded, setIsExpanded}) => {
    return (
        <>
            <div style={{width: '100%', padding: '0px', margin: '0px'}}
                onClick={() => setIsExpanded((prevIsExpanded: boolean) => !prevIsExpanded)}
            >
                {controllerElement(isExpanded)}
            </div>
            {isExpanded && <div style={{width: '100%', padding: '0px', margin: '0px', textAlign: 'right'}}>{children}</div>}
        </>
    )
}

export default Accordion;