import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/disney-hotstar-logo-dark.svg';
import KidsLogo from '../public/kids-logo.svg';
import Bar from '../public/bars-solid.svg';

const NavBar = ({account}) => {
    return (
        <div className="navbar">
            <div className="logo-wrapper">
                <Image src={Bar} alt="bar" width={20} height={35} />
                <div className='nav-section'>
                    <ul>
                        <li><Link href="/"><Image src={logo} alt="Disney Logo" width={115} height={45} /></Link></li>
                        <li>TV</li>
                        <li>Movies</li>
                        <li>Sports</li>
                        <li>Disney+</li>
                        <li><Image src={KidsLogo} alt="logokids" height={25} width={30} /></li>
                    </ul>
                </div>
            </div>

            <div className="account-info">
                <p> {account.username}</p>
                <Image className="avatar" src={account.avatar.url} height={25} width={25}  />
            </div>
        </div>
    )
}

export default NavBar