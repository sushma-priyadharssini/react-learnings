import { useParams } from "react-router";

const ProductDetails = (props) => {
    const params = useParams();
    return (
        <section>{`Product detail ${params.productId}`}</section>
    )
}

export default ProductDetails;