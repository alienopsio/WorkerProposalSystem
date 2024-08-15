import { CardStatus } from "@/app/common/utils/generate-card-data.util"
import { TuseFiltersCards } from "@/app/hook/useFiltersCards"

type TFilterFunction = TuseFiltersCards['handleSelectFilter']

export default function FilterProposalBar({
  handleSelectFilter
}: {
  handleSelectFilter: TFilterFunction
}) {
  const filters = [
    {
      name: 'all_proposals',
      color: '#FFF'
    },
    {
      name: CardStatus.voting,
      color: '#FFD600'
    },
    {
      name: CardStatus.in_progress,
      color: '#DBFF00'
    },
    {
      name: CardStatus.finalizing,
      color: '#00FF94'
    },
    {
      name: CardStatus.completed,
      color: '#00FFFF'
    },
    {
      name: CardStatus.in_dispute,
      color: '#FF29D0'
    },
    {
      name: CardStatus.rejected,
      color: '#FF3A3A'
    },
    {
      name: CardStatus.expired,
      color: '#9F9F9F'
    }
  ]

  return (
    <div className="flex items-center gap-2 w-full border-b border-white/40">
      {filters.map(filter => (
        <button
          key={filter.name}
          onClick={() => handleSelectFilter(filter.name)}
          className="flex relative w-full"
        >
          <div className="text-nowrap filterbutton uppercase font-bold border-solid align-middle border-white px-5 w-full h-8">
            <span style={{ color: filter.color }}>
              {filter.name.replace('_', ' ')}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
