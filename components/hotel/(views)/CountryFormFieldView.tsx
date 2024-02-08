import React, { useEffect, useState } from 'react';
import useLocation from '@/hooks/useLocation';
import { ICity, IState } from 'country-state-city';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

type CountryFormFieldViewProps = {
  form: any;
};
const CountryFormFieldView = ({ form }: CountryFormFieldViewProps) => {
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading] = useState<boolean>(false);

  const { getAllCountries, getCountryStates, getStateCities } = useLocation();
  const countries = getAllCountries();

  useEffect(() => {
    const selectedCountry = form.watch('country');
    const countryStates = getCountryStates(selectedCountry);
    if (countryStates) {
      setStates(countryStates);
    }
  }, [form.watch('country')]);

  useEffect(() => {
    const selectedCountry = form.watch('country');
    const selectedState = form.watch('state');
    const stateCities = getStateCities(selectedCountry, selectedState);
    if (stateCities) {
      setCities(stateCities);
    }
  }, [form.watch('country'), form.watch('state')]);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="country"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Country *</FormLabel>
              <FormDescription>
                In Which country is your property located?
              </FormDescription>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue
                    defaultValue={field.value}
                    placeholder="Select a Country"
                  />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          name="state"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select State</FormLabel>
              <FormDescription>In Which state is your property located?</FormDescription>
              <Select
                disabled={isLoading || states.length < 1}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue defaultValue={field.value} placeholder="Select a State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
      <FormField
        name="city"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select City</FormLabel>
            <FormDescription>
              In Which town/city is your property located?
            </FormDescription>
            <Select
              disabled={isLoading || cities.length < 1}
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <SelectTrigger className="bg-background">
                <SelectValue defaultValue={field.value} placeholder="Select a City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <FormField
        name="locationDescription"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location Description *</FormLabel>
            <FormDescription>
              Provide a detailed location description of your hotel
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="Located at the very end of the beach road!"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CountryFormFieldView;
