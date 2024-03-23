export function Overlay({ isOpen, onClose, children, title }) {
    return (
        <>
            {
                isOpen ? (
                    <div className='overlay'>
                        <div className='overlay-background' onClick={onClose} />
                        <div className='overlay-cont'>

                            <div className='overlay-ctrl'>
                                {title}
                                {/*<button onClick={onClose} type="button" className='overlay-close' />*/}
                            </div>
                            {children}
                        </div>
                    </div>
                ): null

            }


        </>

    )

}