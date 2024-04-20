export type GetAccountResult = {
    address: NonNullable<any>;
    connector:NonNullable<any>;
    isConnected: boolean;
    isConnecting: boolean;
    isDisconnected: boolean;
    isReconnecting: boolean;
    status: string;
}