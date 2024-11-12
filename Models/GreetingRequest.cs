namespace PROG3175_A1.Models;

public class GreetingRequest {
    public string? TimeOfDay { get; set; }
    public string? Language { get; set; }
    public string? Tone { get; set; }

    public GreetingRequest() {
        Tone = "Formal";
    }
}