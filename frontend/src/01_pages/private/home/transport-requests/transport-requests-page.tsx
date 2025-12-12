import { useState } from 'react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import { type MoveTransportRequest } from '@/04_types/move/move-transport-request';
import useMoveTransportRequestStore from '@/05_stores/move/move-transport-request-store';
import DataTable, {
  type DataTableColumn,
} from '@/components/data-table/data-table';
import InputGroup from '@/components/input-group/input-group';
import DataTableGridSkeleton from '@/components/skeleton/data-table-grid-skeleton';
import Tooltip from '@/components/tooltip/tooltip';
import PageHeader from '@/components/typography/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardBody } from '@/components/ui/card';
import { TableCell, TableRow } from '@/components/ui/table';
import useTanstackPaginateQuery from '@/hooks/tanstack/use-tanstack-paginate-query';
import { getDateTimezone } from '@/lib/date/get-date-timezone';
import CreateMoveTransportRequestDialog from './_dialogs/create-move-transport-request-dialog';
import DeleteMoveTransportRequestDialog from './_dialogs/delete-move-transport-request-dialog';
import UpdateMoveTransportRequestDialog from './_dialogs/update-move-transport-request-dialog';

const MoveTransportRequestsPage = () => {
  // Store
  const { setSelectedMoveTransportRequest } = useMoveTransportRequestStore();

  // Dialog states
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Tanstack query hook for pagination
  const moveTransportRequestsPagination =
    useTanstackPaginateQuery<MoveTransportRequest>({
      endpoint: '/move/transport-requests',
      defaultSort: 'id',
    });

  // Table column definitions
  const columns: DataTableColumn[] = [
    { label: 'ID', column: 'id', className: 'w-[80px]' },
    { label: 'Rider Type', column: 'rider_type' },
    { label: 'Passenger Name', column: 'passenger_name' },
    { label: 'Passenger Department', column: 'passenger_department' },
    { label: 'Passenger Email', column: 'passenger_email' },
    { label: 'Pickup Location', column: 'pickup_location' },
    { label: 'Dropoff Location', column: 'dropoff_location' },
    { label: 'Pickup Date Time', column: 'pickup_date_time' },
    { label: 'Dropoff Date Time', column: 'dropoff_date_time' },
    { label: 'Purpose', column: 'purpose' },
    { label: 'Status', column: 'status' },
    { label: 'Move Driver Id', column: 'move_driver_id' },
    { label: 'Move Vehicle Id', column: 'move_vehicle_id' },
    { label: 'External Service Flag', column: 'external_service_flag' },
    { label: 'External Service Provider', column: 'external_service_provider' },
    { label: 'Notes', column: 'notes' },
    { label: 'Created At', column: 'created_at', className: 'w-[200px]' },
    { label: 'Actions', className: 'w-[100px]' },
  ];

  // Actions buttons
  const actions = (
    <Button size="sm" onClick={() => setOpenCreateDialog(true)}>
      Create
    </Button>
  );

  // List view content
  const list = (
    <>
      {moveTransportRequestsPagination.data?.records
        ? moveTransportRequestsPagination.data.records.map(
            moveTransportRequest => (
              <TableRow key={moveTransportRequest.id}>
                <TableCell>{moveTransportRequest.id}</TableCell>
                <TableCell>{moveTransportRequest.rider_type}</TableCell>
                <TableCell>{moveTransportRequest.passenger_name}</TableCell>
                <TableCell>
                  {moveTransportRequest.passenger_department}
                </TableCell>
                <TableCell>{moveTransportRequest.passenger_email}</TableCell>
                <TableCell>{moveTransportRequest.pickup_location}</TableCell>
                <TableCell>{moveTransportRequest.dropoff_location}</TableCell>
                <TableCell>{moveTransportRequest.pickup_date_time}</TableCell>
                <TableCell>{moveTransportRequest.dropoff_date_time}</TableCell>
                <TableCell>{moveTransportRequest.purpose}</TableCell>
                <TableCell>{moveTransportRequest.status}</TableCell>
                <TableCell>{moveTransportRequest.move_driver_id}</TableCell>
                <TableCell>{moveTransportRequest.move_vehicle_id}</TableCell>
                <TableCell>
                  {moveTransportRequest.external_service_flag}
                </TableCell>
                <TableCell>
                  {moveTransportRequest.external_service_provider}
                </TableCell>
                <TableCell>{moveTransportRequest.notes}</TableCell>
                <TableCell>
                  {getDateTimezone(
                    moveTransportRequest.created_at,
                    'date_time',
                  )}
                </TableCell>
                <TableCell>
                  <InputGroup size="sm">
                    <Tooltip content="Update">
                      <Button
                        variant="info"
                        size="icon-xs"
                        onClick={() => {
                          setSelectedMoveTransportRequest(moveTransportRequest);
                          setOpenUpdateDialog(true);
                        }}
                      >
                        <FaPenToSquare />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete">
                      <Button
                        variant="destructive"
                        size="icon-xs"
                        onClick={() => {
                          setSelectedMoveTransportRequest(moveTransportRequest);
                          setOpenDeleteDialog(true);
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </Tooltip>
                  </InputGroup>
                </TableCell>
              </TableRow>
            ),
          )
        : null}
    </>
  );

  // Grid view content
  const grid = (
    <>
      {moveTransportRequestsPagination.data?.records ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2">
          {moveTransportRequestsPagination.data?.records.map(
            moveTransportRequest => (
              <div
                className="p-layout rounded border"
                key={moveTransportRequest.id}
              >
                <h4 className="mb-layout">{moveTransportRequest.rider_type}</h4>

                <div className="flex justify-end">
                  <InputGroup size="sm">
                    <Tooltip content="Update">
                      <Button
                        variant="info"
                        size="icon-xs"
                        onClick={() => {
                          setSelectedMoveTransportRequest(moveTransportRequest);
                          setOpenUpdateDialog(true);
                        }}
                      >
                        <FaPenToSquare />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Delete">
                      <Button
                        variant="destructive"
                        size="icon-xs"
                        onClick={() => {
                          setSelectedMoveTransportRequest(moveTransportRequest);
                          setOpenDeleteDialog(true);
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </Tooltip>
                  </InputGroup>
                </div>
              </div>
            ),
          )}
        </div>
      ) : null}
    </>
  );

  return (
    <>
      <PageHeader className="mb-3">Move Transport Requests</PageHeader>

      <Card>
        <CardBody>
          <DataTable
            pagination={moveTransportRequestsPagination}
            columns={columns}
            actions={actions}
            showViewToggle
            list={list}
            grid={grid}
            gridSkeleton={<DataTableGridSkeleton />}
          ></DataTable>
        </CardBody>
      </Card>

      {/* Dialogs */}
      <CreateMoveTransportRequestDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        refetch={moveTransportRequestsPagination.refetch}
      />
      <UpdateMoveTransportRequestDialog
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
        refetch={moveTransportRequestsPagination.refetch}
      />
      <DeleteMoveTransportRequestDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        refetch={moveTransportRequestsPagination.refetch}
      />
    </>
  );
};

export default MoveTransportRequestsPage;
