import { UserStoreState } from './user-store'
import { MarketStoreState } from './market-store'
import { ModelStoreState } from './model-store'


export interface State {
    user: UserStoreState.State,
    market: MarketStoreState.State,
    management: ModelStoreState.State
}

