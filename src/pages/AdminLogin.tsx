import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "@/utils/adminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-in and sign-up
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign-up mode
        const success = await signUp(email, password);
        if (!success) {
          toast({
            title: "Sign-up failed",
            description: "Could not create account. Email may already be in use.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        toast({
          title: "Sign-up successful",
          description: "Account created. Please sign in to continue.",
          variant: "default",
        });
        setIsSignUp(false); // Switch back to sign-in mode
      } else {
        // Sign-in mode
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        
        if (error) {
          console.error("Supabase login error:", error);
          toast({
            title: "Login failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Set session storage for backward compatibility
        login(email, password);
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
          variant: "default",
        });
        navigate("/admin");
      }
    } catch (error) {
      console.error(`${isSignUp ? "Sign-up" : "Login"} error:`, error);
      toast({
        title: `${isSignUp ? "Sign-up" : "Login"} error`,
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail(""); // Clear form on mode switch
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Admin {isSignUp ? "Sign Up" : "Login"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp
                ? "Create a new admin account"
                : "Enter your credentials to access the admin dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (isSignUp ? "Creating account..." : "Logging in...") : (isSignUp ? "Sign Up" : "Login")}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              variant="link"
              className="text-sm text-blue-600 hover:underline"
              onClick={toggleMode}
            >
              {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
            </Button>
            <p className="text-sm text-gray-500">
              This area is restricted to administrators only
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "@/utils/adminAuth";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/integrations/supabase/client";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Use Supabase authentication for login
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: email,
//         password: password
//       });
      
//       if (error) {
//         console.error("Supabase login error:", error);
//         toast({
//           title: "Login failed",
//           description: "Invalid email or password",
//           variant: "destructive",
//         });
//         setIsLoading(false);
//         return;
//       }

//       // Set session storage for backward compatibility
//       login(email, password);
      
//       toast({
//         title: "Login successful",
//         description: "Welcome to the admin dashboard",
//         variant: "default",
//       });
//       navigate("/admin");
//     } catch (error) {
//       console.error("Login error:", error);
//       toast({
//         title: "Login error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md px-4">
//         <Card>
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
//             <CardDescription className="text-center">
//               Enter your credentials to access the admin dashboard
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <div className="grid gap-4">
//                 <div className="grid gap-2">
//                   <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                     Email
//                   </label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     autoComplete="email"
//                     required
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//                     Password
//                   </label>
//                   <Input
//                     id="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     autoComplete="current-password"
//                     required
//                   />
//                 </div>
//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading ? "Logging in..." : "Login"}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//           <CardFooter className="flex justify-center">
//             <p className="text-sm text-gray-500">
//               This area is restricted to administrators only
//             </p>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
