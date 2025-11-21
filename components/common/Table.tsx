interface Column {
  key: string;
  label: string;
  fixed?: 'left' | 'right';
}

interface TableProps {
  columns: Column[];
  data: Record<string, string>[];
}

const Table = ({ columns, data }: TableProps) => {
  const displayData = data.slice(0, 5);

  const rightFixedColumns = columns.filter((col) => col.fixed === 'right');
  const scrollableColumns = columns.filter((col) => col.fixed !== 'right');

  const getWidthClass = (idx: number) => {
    switch (idx) {
      case 0:
        return 'w-[228px] min-w-[228px]';
      case 1:
        return 'w-[300px] min-w-[300px]';
      case 2:
        return 'w-[200px] min-w-[200px]';
      case 3:
        return 'lg:w-[236px] lg:min-w-[236px] sm:w-[220px] sm:min-w-[220px] w-[162px] min-w-[162px] ';
      default:
        return 'w-auto';
    }
  };

  return (
    <div className="text-balck @container mx-auto w-full max-w-[964px] font-normal">
      {/* 부모 요소의 크기가 964px 이상 */}
      <div className="hidden overflow-hidden rounded-xl @[964px]:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-red-10">
              {columns.map((col, idx) => (
                <th
                  key={col.key}
                  className={`${getWidthClass(idx)} border-gray-20 items-center border-b px-3 py-[14px] text-left text-[12px] leading-[22px] sm:text-[14px]`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, idx) => (
              <tr key={idx} className="border-gray-20 border-b">
                {columns.map((col, idx) => (
                  <td
                    key={col.key}
                    className={`${getWidthClass(idx)} px-3 py-5 text-[14px] leading-[22px] sm:text-[16px]`}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 부모 요소의 크기가 964px 미만 */}
      <div className="relative block @[963px]:hidden">
        <div className="flex overflow-hidden rounded-xl">
          {/* 스크롤 컬럼 */}
          <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [-webkit-scrollbar]:hidden">
            <table className="border-collapse">
              <thead>
                <tr className="bg-red-10">
                  {scrollableColumns.map((col, idx) => (
                    <th
                      key={col.key}
                      className={`${getWidthClass(idx)} border-gray-20 items-center border-b px-3 py-[14px] text-left text-[12px] leading-[22px] sm:text-[14px]`}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayData.map((row, idx) => (
                  <tr key={idx} className="border-gray-20 border-b">
                    {scrollableColumns.map((col) => (
                      <td
                        key={col.key}
                        className={`${getWidthClass(idx)} px-3 py-5 text-[14px] sm:text-[16px]`}>
                        {row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 고정된 오른쪽 컬럼 */}
          {rightFixedColumns.length > 0 && (
            <div className="border-gray-20 border-l bg-white">
              <table className="border-collapse">
                <thead>
                  <tr className="bg-red-10">
                    {rightFixedColumns.map((col) => (
                      <th
                        key={col.key}
                        className={`${getWidthClass(3)} border-gray-20 items-center border-b px-3 py-[14px] text-left text-[12px] leading-[22px] sm:text-[14px]`}>
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`${getWidthClass(3)} border-gray-20 border-b`}>
                      {rightFixedColumns.map((col) => (
                        <td
                          key={col.key}
                          className={`${getWidthClass(3)} px-3 py-5 text-[14px] sm:text-[16px]`}>
                          {row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
