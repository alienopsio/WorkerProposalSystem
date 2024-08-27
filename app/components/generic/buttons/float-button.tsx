import { CardStatus } from '@/app/common/utils/generate-card-data.util'
import { TuseFiltersCards } from '@/app/hook/useFiltersCards'
type ThandleSelectFilter = TuseFiltersCards['handleSelectFilter']
export const FloatButton = ({
  handleSelectFilter
}: {
  handleSelectFilter: ThandleSelectFilter
}) => {
  return (
    <div className={`flex gap-5 bg-black/50 px-8 py-3`}>
      <button
        onClick={() => handleSelectFilter('all_proposals')}
        className={`bg-black text-white text-sm border border-white px-3 py-1`}
      >
        Visitor
      </button>
      <button
        onClick={() => handleSelectFilter('all_proposals')}
        className={`bg-black text-white text-sm border border-white px-3 py-1`}
      >
        Explorer
      </button>
      <button
        onClick={() => handleSelectFilter('all_proposals')}
        className={`bg-black text-white text-sm border border-white px-3 py-1`}
      >
        DAO
      </button>
      <button
        onClick={() => handleSelectFilter(CardStatus.in_dispute)}
        className={`bg-black text-white text-sm border border-white px-3 py-1`}
      >
        ARBITER
      </button>
    </div>
  )
}
