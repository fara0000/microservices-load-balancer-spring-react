import { FC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
    params: { sortable: string, limit: number, offset: number }
    children: number;
    setGetParams: any;
}

export const PaginationButton: FC<Props> = ({ params, children, setGetParams }) => {
    return (
        <Button style={params.offset === children ? { background: '#00acff9e' } : {}} height="20px" w="15px" borderRadius="10px" onClick={() => setGetParams({...params, offset: children})} border="1px solid #FFFFFF" fontWeight="400" fontSize="14px">
            {children}
        </Button>
    )
}