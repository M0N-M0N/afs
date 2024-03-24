export function Overlay({ isOpen, onClose, children, title }) {
    return (
        <>
            {
                isOpen ? (
                    <div className='overlay'>
                        <div className='overlay-background' onClick={onClose} />
                        <div className='overlay-cont'>

                            <div className='overlay-ctrl'>
                                <div className="overlay-ctrl-title">{title}</div>
                                {/*<button onClick={onClose} type="button" className='overlay-close' />*/}
                            </div>
                            <div className="overlay-ctrl-cont">
                                {children}

                            </div>
                        </div>
                    </div>
                ): null

            }


        </>

    )

}