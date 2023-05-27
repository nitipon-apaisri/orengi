import PageNotFoundImg from "../../assets/images/page_not_found.svg";
const PageNotFoundView = () => {
    return (
        <div className="page-not-found-img">
            <img src={PageNotFoundImg} alt="Page not found" />
            <a href="https://storyset.com/web">Web illustrations by Storyset</a>
        </div>
    );
};

export default PageNotFoundView;
