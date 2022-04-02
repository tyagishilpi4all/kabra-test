import { Footer } from "../Footer/Footer"
import AdminHeader from "../Header/AdminHeader" 

const AdminLayout = ({ children }) => {
    return (
        <div>
            <AdminHeader />
            {children}
            <Footer />
        </div>
    )
}
export default AdminLayout