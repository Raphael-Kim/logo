import { connect } from "react-redux";
import RootContainer from "./presenter";

const mapStateToProps = (state, ownProps) => {
    const { user } = state;
    return {
        isLoggedIn: user.isLoggedIn // isLoggedIn을 subscribe()한 후 계속 listen해야함
    };
};

export default connect(mapStateToProps)(RootContainer);