import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import useMoveTransportRequestStore from '@/05_stores/move/move-transport-request-store';
import { mainInstance } from '@/07_instances/main-instance';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Form validation schema
const FormSchema = z.object({
  rider_type: z.string().min(1, { message: 'Required' }),
  passenger_name: z.string().min(1, { message: 'Required' }),
  passenger_department: z.string().min(1, { message: 'Required' }),
  passenger_email: z.string().min(1, { message: 'Required' }),
  pickup_location: z.string().min(1, { message: 'Required' }),
  dropoff_location: z.string().min(1, { message: 'Required' }),
  pickup_date_time: z.string().min(1, { message: 'Required' }),
  dropoff_date_time: z.string().min(1, { message: 'Required' }),
  purpose: z.string().min(1, { message: 'Required' }),
  status: z.string().min(1, { message: 'Required' }),
  move_driver_id: z.string().min(1, { message: 'Required' }),
  move_vehicle_id: z.string().min(1, { message: 'Required' }),
  external_service_flag: z.string().min(1, { message: 'Required' }),
  external_service_provider: z.string().min(1, { message: 'Required' }),
  notes: z.string().min(1, { message: 'Required' }),
});

// Props
type UpdateMoveTransportRequestDialogProps = {
  open: boolean; // Dialog open state
  setOpen: (value: boolean) => void; // Function to open/close dialog
  refetch: () => void; // Function to refetch the table data after update
};

const UpdateMoveTransportRequestDialog = ({
  open,
  setOpen,
  refetch,
}: UpdateMoveTransportRequestDialogProps) => {
  // Zustand store
  const { selectedMoveTransportRequest } = useMoveTransportRequestStore();

  // Initialize react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rider_type: '',
      passenger_name: '',
      passenger_department: '',
      passenger_email: '',
      pickup_location: '',
      dropoff_location: '',
      pickup_date_time: '',
      dropoff_date_time: '',
      purpose: '',
      status: '',
      move_driver_id: '',
      move_vehicle_id: '',
      external_service_flag: '',
      external_service_provider: '',
      notes: '',
    },
  });

  // Populate form with selected item's data
  useEffect(() => {
    if (selectedMoveTransportRequest) {
      form.reset({
        rider_type: selectedMoveTransportRequest.rider_type || '',
        passenger_name: selectedMoveTransportRequest.passenger_name || '',
        passenger_department:
          selectedMoveTransportRequest.passenger_department || '',
        passenger_email: selectedMoveTransportRequest.passenger_email || '',
        pickup_location: selectedMoveTransportRequest.pickup_location || '',
        dropoff_location: selectedMoveTransportRequest.dropoff_location || '',
        pickup_date_time: selectedMoveTransportRequest.pickup_date_time || '',
        dropoff_date_time: selectedMoveTransportRequest.dropoff_date_time || '',
        purpose: selectedMoveTransportRequest.purpose || '',
        status: selectedMoveTransportRequest.status || '',
        move_driver_id:
          String(selectedMoveTransportRequest.move_driver_id) || '',
        move_vehicle_id: selectedMoveTransportRequest.move_vehicle_id || '',
        external_service_flag:
          String(selectedMoveTransportRequest.external_service_flag) || '',
        external_service_provider:
          selectedMoveTransportRequest.external_service_provider || '',
        notes: selectedMoveTransportRequest.notes || '',
      });
    }
  }, [selectedMoveTransportRequest, form]);

  // Loading state for submit button
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  // Handle form submission
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoadingUpdate(true);

    toast.promise(
      mainInstance.patch(
        `/move/transport-requests/${selectedMoveTransportRequest?.id}`,
        data,
      ),
      {
        loading: 'Loading...',
        success: () => {
          refetch();
          setOpen(false);
          return 'Success!';
        },
        error: error =>
          error.response?.data?.message || error.message || 'An error occurred',
        finally: () => setIsLoadingUpdate(false), // Reset loading state
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <DialogHeader>
              <DialogTitle>Update Move Transport Request</DialogTitle>
            </DialogHeader>

            <DialogBody>
              <div className="grid grid-cols-12 gap-3">
                {/* Rider Type Field */}
                <FormField
                  control={form.control}
                  name="rider_type"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Rider Type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Passenger Name Field */}
                <FormField
                  control={form.control}
                  name="passenger_name"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Passenger Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Passenger Department Field */}
                <FormField
                  control={form.control}
                  name="passenger_department"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Passenger Department</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Passenger Email Field */}
                <FormField
                  control={form.control}
                  name="passenger_email"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Passenger Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Pickup Location Field */}
                <FormField
                  control={form.control}
                  name="pickup_location"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Pickup Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Dropoff Location Field */}
                <FormField
                  control={form.control}
                  name="dropoff_location"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Dropoff Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Pickup Date Time Field */}
                <FormField
                  control={form.control}
                  name="pickup_date_time"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Pickup Date Time</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Dropoff Date Time Field */}
                <FormField
                  control={form.control}
                  name="dropoff_date_time"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Dropoff Date Time</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Purpose Field */}
                <FormField
                  control={form.control}
                  name="purpose"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Purpose</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Status Field */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Move Driver Id Field */}
                <FormField
                  control={form.control}
                  name="move_driver_id"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Move Driver Id</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Move Vehicle Id Field */}
                <FormField
                  control={form.control}
                  name="move_vehicle_id"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Move Vehicle Id</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* External Service Flag Field */}
                <FormField
                  control={form.control}
                  name="external_service_flag"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>External Service Flag</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* External Service Provider Field */}
                <FormField
                  control={form.control}
                  name="external_service_provider"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>External Service Provider</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Notes Field */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="col-span-12">
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogBody>

            <DialogFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoadingUpdate}>
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMoveTransportRequestDialog;
