

using System.Collections.ObjectModel;
using System.Net;
using System.Net.Http.Json;
using PROG3175_A1.Models;

class Program {
    public async static Task Main() {
        HttpClient client = new()
        {
            BaseAddress = new Uri("http://localhost/")
        };

        Collection<string>? timesOfDay = null, languages = null;

        try {
            Console.WriteLine("Connecting to server...");

            timesOfDay = await client.GetFromJsonAsync<Collection<string>>("GetAllTimesOfDay");
            languages = await client.GetFromJsonAsync<Collection<string>>("GetSupportedLanguages");
        }
        catch (HttpRequestException) {
            Console.WriteLine("Could not connect to server.");
            return;
        }

        Console.WriteLine("Welcome to the greetings client.");
        Console.WriteLine($"Times of day: {string.Join(", ", timesOfDay ?? [])}");
        Console.WriteLine($"Languages: {string.Join(", ", languages ?? [])}");

        while (true) {
            Console.WriteLine("Input time of day: ");
            string? timeOfDay = Console.ReadLine();

            Console.WriteLine("Input language: ");
            string? language = Console.ReadLine();

            Console.WriteLine("Input tone: ");
            string? tone = Console.ReadLine();

            Console.WriteLine("Getting greeting...");

            try {
                GreetingResponse? response = await client.GetFromJsonAsync<GreetingResponse>(
                    $"Greet?timeOfDay={timeOfDay}&language={language}&tone={tone}");
                
                if (response != null) {
                    Console.WriteLine($"Greeting: \"{response.GreetingMessage}\"");
                }
            }
            catch (HttpRequestException) {
                Console.WriteLine("Greeting not found.");
            }
        }
    }
}