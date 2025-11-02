import { Button } from "@/components/ui/button";
import { logout } from "@/utils/adminAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      logout();
      await supabase.auth.signOut();
      navigate("/admin/login");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-nanenane-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">NANENANE Admin</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Button 
                variant="link" 
                className="text-white" 
                onClick={() => navigate("/admin")}
              >
                Dashboard
              </Button>
            </li>
            <li>
              <Button 
                variant="link" 
                className="text-white" 
                onClick={() => navigate("/admin/products")}
              >
                Products
              </Button>
            </li>
            <li>
              <Button 
                variant="link" 
                className="text-white" 
                onClick={() => navigate("/admin/content")}
              >
                Content
              </Button>
            </li>
            <li>
              <Button 
                variant="link" 
                className="text-white" 
                onClick={() => navigate("/")}
              >
                View Site
              </Button>
            </li>
            <li>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <Spinner size="sm" className="mr-2" />
                ) : null}
                Logout
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;

// import { Button } from "@/components/ui/button";
// import { logout } from "@/utils/adminAuth";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import { useState } from "react";
// import { Spinner } from "@/components/ui/spinner";

// const AdminHeader = () => {
//   const navigate = useNavigate();
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   const handleLogout = async () => {
//     setIsLoggingOut(true);
    
//     try {
//       // Clear session storage
//       logout();
      
//       // Sign out from Supabase
//       await supabase.auth.signOut();
      
//       navigate("/admin/login");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     } finally {
//       setIsLoggingOut(false);
//     }
//   };

//   return (
//     <header className="bg-nanenane-800 text-white py-4">
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <h1 className="text-xl font-bold">NANENANE Admin</h1>
//         </div>
//         <nav>
//           <ul className="flex space-x-6">
//             <li>
//               <Button 
//                 variant="link" 
//                 className="text-white" 
//                 onClick={() => navigate("/admin")}
//               >
//                 Dashboard
//               </Button>
//             </li>
//             <li>
//               <Button 
//                 variant="link" 
//                 className="text-white" 
//                 onClick={() => navigate("/admin/products")}
//               >
//                 Products
//               </Button>
//             </li>
//             <li>
//               <Button 
//                 variant="link" 
//                 className="text-white" 
//                 onClick={() => navigate("/admin/updates")}
//               >
//                 Updates
//               </Button>
//             </li>
//             <li>
//               <Button 
//                 variant="link" 
//                 className="text-white" 
//                 onClick={() => navigate("/")}
//               >
//                 View Site
//               </Button>
//             </li>
//             <li>
//               <Button 
//                 variant="destructive" 
//                 size="sm" 
//                 onClick={handleLogout}
//                 disabled={isLoggingOut}
//               >
//                 {isLoggingOut ? (
//                   <Spinner size="sm" className="mr-2" />
//                 ) : null}
//                 Logout
//               </Button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default AdminHeader;
