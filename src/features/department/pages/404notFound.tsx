import pageNotFound from '../../../assets/page-not-found.jpg'; 

export function NotFound (){
    return (

        <div className="w-1/2 mt-12 mx-auto h-auto" style={{height:"550px"}}>
            <img className="" src={pageNotFound} alt="Page not found" />
        </div>
    );
}