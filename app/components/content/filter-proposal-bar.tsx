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
      showName: 'All Proposals',
      color: '#FFF'
    },
    {
      name: CardStatus.voting,
      showName: 'Voting',
      color: '#FFD600'
    },
    {
      name: CardStatus.in_progress,
      showName: 'In Progress',
      color: '#DBFF00'
    },
    {
      name: CardStatus.finalizing,
      showName: 'Finalizing',
      color: '#00FF94'
    },
    {
      name: CardStatus.completed,
      showName: 'Completed',
      color: '#00FFFF'
    },
    {
      name: CardStatus.in_dispute,
      showName: 'In Dispute',
      color: '#FF29D0'
    },
    {
      name: CardStatus.rejected,
      showName: 'Rejected',
      color: '#FF3A3A'
    },
    {
      name: CardStatus.expired,
      showName: 'Expired',
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
              {filter.showName}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
