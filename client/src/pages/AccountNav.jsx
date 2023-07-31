
import { Link,useLocation } from "react-router-dom"

const AccountNav = () => {
    const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if(subpage=== undefined){
        subpage = 'profile'
    }

    function linkClasses(type = null) {
        let classes = 'inline-flex gap-1 py-2 px-6  rounded-full'
        if (type ===subpage) {
            classes += ' bg-primary text-white'
        }else{
            classes += ' bg-gray-300'
        }
        return classes;
    }



    return ( 
        <>
          <nav className="w-full flex justify-center mt-8  mb-8 gap-2">
                <Link className={linkClasses('profile')} to={'/account'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>

                    My Profile
                </Link>
             {/* <Link className={linkClasses('bookings')} to={'/account/bookings'}>Bookings</Link> */}
                <Link className={linkClasses('places')} to={'/account/places'}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

               
                My Places
                </Link>
            </nav>
        </>
     );
}
 
export default AccountNav;