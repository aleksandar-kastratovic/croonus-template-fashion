export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export function GET(request) {
    console.log('HELOOOOOOOO')
  return new Response(`Hello from HELOOOOOOOO`);
}