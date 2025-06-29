import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
    login: handleLogin((req) => {
      return {
        authorizationParams: {
          audience: process.env.AUGMENTATION_API_AUDIENCE,
         
        }
      };
    }),
  
    callback: async (req, res)=>{
      try{
       return  await handleCallback(req,res);
      }catch(error){
        console.log(error)
        return new Response(
          null,
          {
            status: 302,
            headers: { Location: `/error?message=${error.cause?.errorDescription || "Unknown error"}` }
          }
        );
          
      }
    }
  });