import React from 'react'
import { connect } from 'react-redux'


export const Navbar = (props) => {
    return (
        <div>
            
            {/* <!-- Navbar --> */}
            <div className="navbar-fixed ">
                <nav className='grey darken-4'>
                    <div className="nav-wrapper ">
                        <a href="#" className="brand-logo center">Logo</a>
                        <a href="#" data-target="slide-out" className="sidenav-trigger left">
                        sidenav trigger
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li className="active"><a href="#!">Item 1</a></li>
                            <li><a href="#!">Item 2</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            
            {/* <!-- Side Bar Mobile --> */}
            <ul id="slide-out" className="sidenav right">
               
                <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
                <li><a href="#!">Second Link</a></li>
                <li><div className="divider"></div></li>
                <li><a className="subheader">Subheader</a></li>
                <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}


export default Navbar
// export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
